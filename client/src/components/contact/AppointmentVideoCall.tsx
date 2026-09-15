"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";

type CallType = "audio" | "video";
type View = "pre-call" | "connecting" | "in-call" | "error";

const ERROR_MAP: Record<string, string> = {
  "account-missing-payment-method":
    "Our call service is temporarily unavailable. Please try again later or contact us directly.",
  "invalid-request-error":
    "Unable to connect. Please try again.",
  "room-not-found":
    "Call room expired. Please start a new call.",
  "not-found":
    "Call room not found. Please start a new call.",
  "expired":
    "Call room has expired. Please start a new call.",
  "permission-denied":
    "Camera/microphone access is required. Please allow permissions and try again.",
  "track-started":
    "Could not access camera or microphone. Please check your device settings.",
  "network-error":
    "Network error. Please check your internet connection and try again.",
};

function friendlyError(raw: string): string {
  return ERROR_MAP[raw] || "Something went wrong. Please try again.";
}

export default function AppointmentVideoCall() {
  const [userName, setUserName] = useState("");
  const [callType, setCallType] = useState<CallType>("video");
  const [view, setView] = useState<View>("pre-call");
  const [errorMessage, setErrorMessage] = useState("");
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [containerReady, setContainerReady] = useState(false);

  const callContainerRef = useRef<HTMLDivElement>(null);
  const callFrameRef = useRef<DailyCall | null>(null);

  const cleanupFrame = useCallback(() => {
    if (callFrameRef.current) {
      callFrameRef.current.destroy();
      callFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupFrame();
    };
  }, [cleanupFrame]);

  useEffect(() => {
    if (view !== "in-call" || !roomUrl || !containerReady || !callContainerRef.current) return;

    let cancelled = false;

    const startCall = async () => {
      try {
        const frame = DailyIframe.createFrame(callContainerRef.current!, {
          url: roomUrl,
        });

        if (cancelled) {
          frame.destroy();
          return;
        }

        callFrameRef.current = frame;

        frame.on("left-meeting", () => {
          cleanupFrame();
          setRoomUrl(null);
          setContainerReady(false);
          setView("pre-call");
        });

        frame.on("error", (e) => {
          console.error("Daily.co frame error:", e);
          setErrorMessage(friendlyError(e.errorMsg));
          setView("error");
        });

        await frame.join({
          userName,
          startVideoOff: callType === "audio",
        });
      } catch (err) {
        console.error("Daily.co join failed:", JSON.stringify(err), err);
        if (!cancelled) {
          const raw =
            (err as Record<string, string>)?.errorMsg ||
            (err as Error)?.message ||
            "";
          setErrorMessage(friendlyError(raw));
          setView("error");
          cleanupFrame();
        }
      }
    };

    startCall();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, roomUrl, containerReady]);

  const handleStartCall = async () => {
    if (!userName.trim()) return;

    setView("connecting");
    setErrorMessage("");

    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/create-room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callType, callerName: userName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create call room");
      }

      setRoomUrl(data.url);
      setView("in-call");

      requestAnimationFrame(() => {
        setContainerReady(true);
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to start call";
      setErrorMessage(message);
      setView("error");
    }
  };

  const handleRetry = () => {
    setErrorMessage("");
    setRoomUrl(null);
    setContainerReady(false);
    setView("pre-call");
  };

  return (
    <div className="w-full">
      {view === "pre-call" && (
        <div className="space-y-6">
          <Input
            label="Your Name"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">
              Call Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCallType("video")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                  callType === "video"
                    ? "border-primary-500 bg-primary-500/20 text-primary-400"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                <span className="text-lg">&#128249;</span>
                <span className="font-medium">Video Call</span>
              </button>
              <button
                type="button"
                onClick={() => setCallType("audio")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                  callType === "audio"
                    ? "border-primary-500 bg-primary-500/20 text-primary-400"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                <span className="text-lg">&#127908;</span>
                <span className="font-medium">Audio Only</span>
              </button>
            </div>
          </div>

          <Button
            onClick={handleStartCall}
            disabled={!userName.trim()}
            className="w-full"
            size="lg"
          >
            Start Call
          </Button>

          <p className="text-xs text-white/40 text-center">
            You&apos;ll be connected instantly. No account required.
          </p>
        </div>
      )}

      {view === "connecting" && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Spinner size="lg" />
          <p className="text-white/60">Creating your call room...</p>
        </div>
      )}

      {view === "error" && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="text-4xl">&#9888;&#65039;</div>
          <p className="text-white/80 text-center max-w-sm">{errorMessage}</p>
          <Button onClick={handleRetry} variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {view === "in-call" && (
        <div
          ref={callContainerRef}
          className="w-full rounded-2xl overflow-hidden bg-black"
          style={{ height: "500px" }}
        />
      )}
    </div>
  );
}
