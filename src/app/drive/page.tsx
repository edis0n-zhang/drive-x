"use client";

import CameraFeed from "../../../components/drive_components/CameraFeed";
import { Button } from "../../../components/ui/button";
import AssistantButton from "../../../components/drive_components/AssistantButton";
import { Mic } from "lucide-react";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Home() {
  const gradientStyle = {
    height: "100vh",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    background: "linear-gradient(to bottom, #0207EB, #02051F)",
    position: "relative",
    overflow: "hidden",
    color: "white",
  };

  return (
    <div style={gradientStyle} className="flex-col">
      <CameraFeed />
      <AssistantButton />
      <p className="font-inter m-5 mb-16 font-inter font-bold">
        Your Driving Companion
      </p>
    </div>
  );
}
