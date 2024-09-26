"use client";

import useRemixers from "@/programs/useRemixers";
import { useConnection } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";
import Buffer from "tiny-buffer";

export default function DebugWidget() {
  const { connection } = useConnection();
  const remixers = useRemixers();

  const [isVisible, setIsVisible] = useState(false);

  const initialize = async () => {
    if (!remixers) return;
    const sig = await remixers.methods.initialize().rpc();
    console.log(`✅ Success! Sig: ${sig}`);
  };

  const fetchMeme = async () => {
    if (!remixers) return;
    // const fetchedMemes = await remixers.account.meme.all();
    const buf = new Buffer(4);
    buf.writeInt32LE(2147483647, 0);
    const fetchedMemes = await connection.getParsedProgramAccounts(
      remixers.programId,
      {
        filters: [
          // {
          //   dataSize: 165, // number of bytes
          // },
          {
            memcmp: {
              offset: 8,
              bytes: bs58.encode(buf),
            },
          },
        ],
      }
    );
    console.log("heyy", fetchedMemes);
  };

  const asd = async () => {
    const buf = new Buffer(4);
    buf.writeInt32LE(777, 0);
    console.log("heyy", buf);
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
          <button
            type="button"
            className="bg-lime-900 px-2 py-1 rounded-lg"
            onClick={() => fetchMeme()}
          >
            fetch meme
          </button>
          <button
            type="button"
            className="bg-lime-900 px-2 py-1 rounded-lg"
            onClick={() => asd()}
          >
            asd
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
