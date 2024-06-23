import React, { useState, useEffect } from "react";
import { fetchAccessToken } from "@humeai/voice";
import { useVoice, VoiceProvider } from "@humeai/voice-react";
import { Button } from "../../components/ui/button";
import { Mic } from "lucide-react";

export default function AssistantButton() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await fetchAccessToken({
          apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY,
          secretKey: process.env.NEXT_PUBLIC_HUME_SECRET_KEY,
        });
        setAccessToken(token);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAccessToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    return <div>Failed to load access token</div>;
  }

  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <AssistantButtonInner isOpen={isOpen} setIsOpen={setIsOpen} />
    </VoiceProvider>
  );
}

function AssistantButtonInner({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { connect, disconnect } = useVoice();

  const handleClick = () => {
    if (isOpen) {
      disconnect();
    } else {
      connect();
    }
    setIsOpen(!isOpen);
  };

  return (
    <Button
      className={`rounded-full ${
        isOpen
          ? "bg-green-500 hover:bg-green-600"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      size="icon"
      onClick={handleClick}
    >
      <Mic className="h-20 w-20 p-2" />
    </Button>
  );
}
