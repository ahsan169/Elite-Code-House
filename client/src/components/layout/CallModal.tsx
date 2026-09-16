"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import AppointmentVideoCall from "@/components/contact/AppointmentVideoCall";

type CallType = "audio" | "video" | null;

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: CallType;
}

export default function CallModal({ isOpen, onClose, initialType = null }: CallModalProps) {
  const [selectedType, setSelectedType] = useState<CallType>(initialType);

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={!selectedType ? "Start a Call" : undefined}>
      <AnimatePresence mode="wait">
        {!selectedType ? (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <p className="text-white/60 text-sm mb-6">
              Choose how you&apos;d like to connect with us.
            </p>

            <button
              onClick={() => setSelectedType("video")}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary-500/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-white group-hover:text-primary-400 transition-colors">Video Call</div>
                <div className="text-sm text-white/50">Face-to-face conversation</div>
              </div>
              <svg className="w-5 h-5 text-white/30 ml-auto group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => setSelectedType("audio")}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-purple/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center group-hover:bg-accent-purple/30 transition-colors">
                <svg className="w-6 h-6 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold text-white group-hover:text-accent-purple transition-colors">Audio Call</div>
                <div className="text-sm text-white/50">Voice-only connection</div>
              </div>
              <svg className="w-5 h-5 text-white/30 ml-auto group-hover:text-accent-purple transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <p className="text-xs text-white/40 text-center pt-2">
              No account required. Instant connection.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="call"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <button
                onClick={() => setSelectedType(null)}
                className="p-1 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-white/60">
                {selectedType === "video" ? "Video Call" : "Audio Call"}
              </span>
            </div>
            <AppointmentVideoCall />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
