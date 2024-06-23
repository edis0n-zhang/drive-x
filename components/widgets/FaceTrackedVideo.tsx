import { useEffect, useRef } from "react";
import { TrackedFace } from "../../lib/data/trackedFace";

type FaceTrackedVideoProps = {
  className?: string;
  trackedFaces: TrackedFace[];
  onVideoReady: (video: HTMLVideoElement) => void;
  width: number;
  height: number;
};

export function FaceTrackedVideo({
  className,
  trackedFaces,
  onVideoReady,
  width,
  height,
}: FaceTrackedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.error("Missing video element");
      return;
    }
    onVideoReady(videoElement);
  }, [onVideoReady]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const videoElement = videoRef.current;
    const graphics = canvasElement?.getContext("2d");

    if (!canvasElement || !videoElement || !graphics) {
      console.info("Missing canvas, video element, or graphics context");
      return;
    }

    canvasElement.width = videoElement.width = width;
    canvasElement.height = videoElement.height = height;

    graphics.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (trackedFaces.length > 0) {
      graphics.fillStyle = "rgba(40, 40, 40, 0.5)";
      graphics.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }

    trackedFaces.forEach((trackedFace: TrackedFace) => {
      const bbox = trackedFace.boundingBox;
      const scale = 20;
      const b = {
        x: bbox.x - scale,
        y: bbox.y - scale,
        w: bbox.w + 2 * scale,
        h: bbox.h + 2 * scale,
      };

      graphics.beginPath();
      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      const rx = b.w / 2;
      const ry = b.h / 2;

      graphics.lineWidth = 5;
      graphics.strokeStyle = "rgba(250, 250, 250, 0.1)";
      graphics.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
      graphics.stroke();

      graphics.globalCompositeOperation = "destination-out";
      graphics.fillStyle = "rgba(0, 0, 0, 1)";
      graphics.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
      graphics.fill();
      graphics.globalCompositeOperation = "source-over";
    });
  }, [trackedFaces, width, height]);

  return (
    <div className="w-full h-full max-w-full aspect-auto rounded-b-[10%] overflow-hidden relative bg-gray-50 bg-opacity-0">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full h-full object-cover transform scale-x-[-1] ${
          className || ""
        }`}
      />
      <canvas
        ref={canvasRef}
        className="hidden top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
