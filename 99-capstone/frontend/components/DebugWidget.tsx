"use client";

import useRemixers from "@/programs/useRemixers";
import { useState } from "react";

export default function DebugWidget() {
  const remixers = useRemixers();

  const [isVisible, setIsVisible] = useState(false);

  const initialize = async () => {
    if (!remixers) return;
    const sig = await remixers.methods.initialize().rpc();
    console.log(`✅ Success! Sig: ${sig}`);
  };

  if (isVisible) {
    return (
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 bg-lime-400 rounded-3xl p-4">
        <div className="flex gap-1">
          <button
            type="button"
            className="bg-lime-900 px-2 py-1 rounded-lg"
            onClick={() => initialize()}
          >
            initialize
          </button>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="bg-lime-900 px-2 py-1 rounded-lg"
            onClick={() => setIsVisible(false)}
          >
            close
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <button
        type="button"
        className="fixed bottom-6 right-6 w-12 h-12 flex justify-center items-center bg-lime-400 rounded-full text-3xl"
        onClick={() => setIsVisible(true)}
      >
        🐸
      </button>
    );
  }
}
