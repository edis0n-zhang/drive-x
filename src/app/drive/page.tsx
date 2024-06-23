"use client";

import CameraFeed from "../../../components/drive_components/CameraFeed";
import { Button } from "../../../components/ui/button";
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
      <Button className="rounded-full" size="icon">
        <Mic className="h-20 w-20 p-2" />
      </Button>
      <p className="font-inter m-4 font-inter font-bold">
        Your Driving Companion
      </p>
    </div>
  );
}
