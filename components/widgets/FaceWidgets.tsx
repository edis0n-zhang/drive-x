import { Emotion, EmotionName } from "../../lib/data/emotion";
import { None, Optional } from "../../lib/utilities/typeUtilities";
import { useContext, useEffect, useRef, useState } from "react";

import { redirect } from "next/navigation";

import { AuthContext } from "../menu/Auth";
import { Descriptor } from "./Descriptor";
import { FacePrediction } from "../../lib/data/facePrediction";
import { FaceTrackedVideo } from "./FaceTrackedVideo";
import { LoaderSet } from "./LoaderSet";
import { TopEmotions } from "./TopEmotions";
import { TrackedFace } from "../../lib/data/trackedFace";
import { VideoRecorder } from "../../lib/media/videoRecorder";
import { blobToBase64 } from "../../lib/utilities/blobUtilities";
import { getApiUrlWs } from "../../lib/utilities/environmentUtilities";

import AssistantButton from "../../components/drive_components/AssistantButton";

type FaceWidgetsProps = {
  onCalibrate: Optional<(emotions: Emotion[]) => void>;
};

type Emotion = {
  name: string;
  score: number;
};

type Facs = {
  name: string;
  score: number;
};

export function FaceWidgets({ onCalibrate }: FaceWidgetsProps) {
  const authContext = useContext(AuthContext);
  const socketRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<VideoRecorder | null>(null);
  const photoRef = useRef<HTMLCanvasElement | null>(null);
  const mountRef = useRef(true);
  const recorderCreated = useRef(false);
  const numReconnects = useRef(0);
  const [trackedFaces, setTrackedFaces] = useState<TrackedFace[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [facs, setFacs] = useState<Emotion[]>([]);
  const [status, setStatus] = useState("");
  const numLoaderLevels = 5;
  const maxReconnects = 3;
  const loaderNames: EmotionName[] = [];
  const lastAlertTimeRef = useRef<number>(0);
  const alertCooldown = 5000;

  useEffect(() => {
    console.log("Mounting component");
    mountRef.current = true;
    console.log("Connecting to server");
    connect();

    return () => {
      console.log("Tearing down component");
      stopEverything();
    };
  }, []);

  useEffect(() => {
    function handleAlerts(emotions: Emotion[], facs: Emotion[]) {
      const currentTime = Date.now();
      if (currentTime - lastAlertTimeRef.current < alertCooldown) {
        return;
      }
      let tirednessAlert = false;
      let mouthStretchCount = 0;
      let headDownDetected = false;
      let eyeClosureDetected = false;
      let alertMessage = "Alert: ";

      emotions.forEach((emotion) => {
        if (emotion.name === "Tiredness" && emotion.score > 0.9) {
          tirednessAlert = true;
          alertMessage += `Tiredness score (${emotion.score}) exceeded 0.9. `;
        }
      });

      facs.forEach((facsItem) => {
        if (facsItem.name === "AU27 Mouth Stretch" && facsItem.score > 0.6) {
          mouthStretchCount++;
          alertMessage += `Mouth Stretch detected (${facsItem.score}). `;
        }

        if (facsItem.name === "AU54 Head Down" && facsItem.score > 0.65) {
          headDownDetected = true;
          alertMessage += `Head Down detected (${facsItem.score}). `;
        }

        if (facsItem.name === "AU43 Eye Closure" && facsItem.score > 0.7) {
          eyeClosureDetected = true;
          alertMessage += `Eye Closure detected (${facsItem.score}). `;
        }
      });

      if (
        tirednessAlert ||
        mouthStretchCount ||
        headDownDetected ||
        eyeClosureDetected
      ) {
        // alert(alertMessage.trim());
        lastAlertTimeRef.current = currentTime;
        redirect("/alert");
      }
    }

    handleAlerts(emotions, facs);
  }, [emotions, facs]);

  function connect() {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log("Socket already exists, will not create");
    } else {
      const baseUrl = getApiUrlWs(authContext.environment);
      const endpointUrl = `${baseUrl}/v0/stream/models`;
      const socketUrl = `${endpointUrl}?apikey=${authContext.key}`;
      console.log(`Connecting to websocket... (using ${endpointUrl})`);
      setStatus(`Connecting to server...`);

      const socket = new WebSocket(socketUrl);

      socket.onopen = socketOnOpen;
      socket.onmessage = socketOnMessage;
      socket.onclose = socketOnClose;
      socket.onerror = socketOnError;

      socketRef.current = socket;
    }
  }

  async function socketOnOpen() {
    console.log("Connected to websocket");
    setStatus("Connecting to webcam...");
    if (recorderRef.current) {
      console.log("Video recorder found, will use open socket");
      await capturePhoto();
    } else {
      console.warn("No video recorder exists yet to use with the open socket");
    }
  }

  async function socketOnMessage(event: MessageEvent) {
    setStatus("");
    const response = JSON.parse(event.data);
    console.log("Got response", response);
    const predictions: FacePrediction[] = response.face?.predictions || [];
    const warning = response.face?.warning || "";
    const error = response.error;
    if (error) {
      setStatus(error);
      console.error(error);
      stopEverything();
      return;
    }

    if (predictions.length === 0) {
      setStatus(warning.replace(".", ""));
      setEmotions([]);
    }

    const newTrackedFaces: TrackedFace[] = [];
    predictions.forEach(async (pred: FacePrediction, dataIndex: number) => {
      newTrackedFaces.push({ boundingBox: pred.bbox });
      if (dataIndex === 0) {
        const newEmotions = pred.emotions;
        const newFacs = pred.facs;
        setEmotions(newEmotions);
        setFacs(newFacs);
        if (onCalibrate) {
          onCalibrate(newEmotions);
        }
      }
    });
    setTrackedFaces(newTrackedFaces);

    await capturePhoto();
  }

  async function socketOnClose(event: CloseEvent) {
    console.log("Socket closed");

    if (mountRef.current === true) {
      setStatus("Reconnecting");
      console.log("Component still mounted, will reconnect...");
      connect();
    } else {
      console.log("Component unmounted, will not reconnect...");
    }
  }

  async function socketOnError(event: Event) {
    console.error("Socket failed to connect: ", event);
    if (numReconnects.current >= maxReconnects) {
      setStatus(`Failed to connect to the Hume API (${authContext.environment}).
      Please log out and verify that your API key is correct.`);
      stopEverything();
    } else {
      numReconnects.current++;
      console.warn(`Connection attempt ${numReconnects.current}`);
    }
  }

  function stopEverything() {
    console.log("Stopping everything...");
    mountRef.current = false;
    const socket = socketRef.current;
    if (socket) {
      console.log("Closing socket");
      socket.close();
      socketRef.current = null;
    } else {
      console.warn("Could not close socket, not initialized yet");
    }
    const recorder = recorderRef.current;
    if (recorder) {
      console.log("Stopping recorder");
      recorder.stopRecording();
      recorderRef.current = null;
    } else {
      console.warn("Could not stop recorder, not initialized yet");
    }
  }

  async function onVideoReady(videoElement: HTMLVideoElement) {
    console.log("Video element is ready");

    if (!photoRef.current) {
      console.error("No photo element found");
      return;
    }

    if (!recorderRef.current && recorderCreated.current === false) {
      console.log("No recorder yet, creating one now");
      recorderCreated.current = true;
      const recorder = await VideoRecorder.create(
        videoElement,
        photoRef.current,
      );

      recorderRef.current = recorder;
      const socket = socketRef.current;
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("Socket open, will use the new recorder");
        await capturePhoto();
      } else {
        console.warn("No socket available for sending photos");
      }
    }
  }

  async function capturePhoto() {
    const recorder = recorderRef.current;
    console.log("Capturing photo...");

    if (!recorder) {
      console.error("No recorder found");
      return;
    }

    const photoBlob = await recorder.takePhoto();
    sendRequest(photoBlob);
  }

  async function sendRequest(photoBlob: Blob) {
    const socket = socketRef.current;

    if (!socket) {
      console.error("No socket found");
      return;
    }

    const encodedBlob = await blobToBase64(photoBlob);
    const requestData = JSON.stringify({
      data: encodedBlob,
      models: {
        face: { facs: {} },
      },
    });

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(requestData);
    } else {
      console.error("Socket connection not open. Will not capture a photo");
      socket.close();
    }
  }

  return (
    <div className="h-screen flex flex-col items-start items-center justify-start overflow-hidden">
      <FaceTrackedVideo
        onVideoReady={onVideoReady}
        trackedFaces={trackedFaces}
        width={500}
        height={375}
      />
      <canvas className="hidden" ref={photoRef}></canvas>
      <AssistantButton />
      <p className="font-inter m-5 mb-16 font-inter font-bold">
        Your Driving Companion
      </p>
      {/* <div className="pt-6">{status}</div> */}
    </div>
  );
}

FaceWidgets.defaultProps = {
  onCalibrate: None,
};
