"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import api from "@/lib/api";

interface ActiveCall {
  id: string;
  url: string;
  callType: "audio" | "video";
  callerName: string;
  status: string;
  createdAt: string;
}

export default function AdminCallsPage() {
  const [calls, setCalls] = useState<ActiveCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [adminName, setAdminName] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);

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

  const fetchCalls = async () => {
    try {
      const response = await api.get("/create-room/active");
      setCalls(response.data.calls);
    } catch (error) {
      console.error("Failed to fetch calls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
    const interval = setInterval(fetchCalls, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinCall = (call: ActiveCall) => {
    setActiveCall(call);
    setShowJoinModal(true);
  };

  const confirmJoin = async () => {
    if (!activeCall || !adminName.trim()) return;

    setShowJoinModal(false);

    await new Promise((r) => setTimeout(r, 100));

    if (!callContainerRef.current) return;

    const frame = DailyIframe.createFrame(callContainerRef.current, {
      showLeaveButton: true,
      showFullscreenButton: true,
    });

    callFrameRef.current = frame;

    frame.on("left-meeting", () => {
      cleanupFrame();
      setActiveCall(null);
      fetchCalls();
    });

    frame.on("error", (e) => {
      console.error("Call error:", e);
      cleanupFrame();
      setActiveCall(null);
    });

    try {
      await frame.join({
        url: activeCall.url,
        userName: adminName || "Admin",
        startVideoOff: activeCall.callType === "audio",
      });
    } catch (err) {
      console.error("Failed to join:", err);
      cleanupFrame();
      setActiveCall(null);
    }
  };

  const handleEndCall = async (callId: string) => {
    try {
      await api.delete(`/create-room/${callId}`);
      setCalls((prev) => prev.filter((c) => c.id !== callId));
    } catch (error) {
      console.error("Failed to end call:", error);
    }
  };

  const waitingCalls = calls.filter((c) => c.status === "waiting");

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Live Calls</h1>

      {activeCall && (
        <div className="mb-8 p-6 glass rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">
              Active Call with {activeCall.callerName}
            </h2>
            <button
              onClick={() => {
                cleanupFrame();
                setActiveCall(null);
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
            >
              End Call
            </button>
          </div>
          <div
            ref={callContainerRef}
            className="w-full rounded-2xl overflow-hidden bg-black"
            style={{ height: "500px" }}
          />
        </div>
      )}

      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-dark-200 rounded-2xl border border-white/10 shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Join Call</h3>
            <p className="text-white/60 text-sm mb-4">
              Joining call with <strong>{activeCall?.callerName}</strong> ({activeCall?.callType})
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-4 py-3 border border-white/10 text-white/60 rounded-xl hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmJoin}
                disabled={!adminName.trim()}
                className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : waitingCalls.length === 0 ? (
        <div className="p-12 glass rounded-2xl text-center">
          <div className="text-6xl mb-6">&#128222;</div>
          <h3 className="text-2xl font-bold text-white mb-4">No Waiting Calls</h3>
          <p className="text-white/60">
            When a client starts a call from the website, it will appear here.
          </p>
          <button
            onClick={fetchCalls}
            className="mt-6 px-6 py-3 border border-white/10 text-white/60 rounded-xl hover:bg-white/5 transition-colors"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {waitingCalls.map((call) => (
            <div
              key={call.id}
              className="p-6 glass rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    call.callType === "video"
                      ? "bg-primary-500/20"
                      : "bg-accent-lime/20"
                  }`}
                >
                  <span className="text-xl">
                    {call.callType === "video" ? "&#128249;" : "&#127908;"}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white">{call.callerName}</div>
                  <div className="text-sm text-white/60">
                    {call.callType === "video" ? "Video Call" : "Audio Call"} &middot;{" "}
                    {new Date(call.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-400">Waiting</span>
                </div>
                <button
                  onClick={() => handleJoinCall(call)}
                  className="px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Join Call
                </button>
                <button
                  onClick={() => handleEndCall(call.id)}
                  className="px-4 py-2 border border-white/10 text-white/60 rounded-xl hover:bg-white/5 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
