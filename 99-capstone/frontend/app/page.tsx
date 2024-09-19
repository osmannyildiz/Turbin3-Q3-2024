"use client";

import useRemixers from "@/programs/useRemixers";
import { useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";
import { useEffect, useState } from "react";

export default function Home() {
  const { connection } = useConnection();
  const remixers = useRemixers();

  // Don't render the wallet button on the server to avoid hydration error
  // Thanks Next.js, I hate this
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const initialize = async () => {
    if (!remixers) return;
    const sig = await remixers.methods.initialize().rpc();
    console.log(`✅ Success! Sig: ${sig}`);
  };

  const createMeme = async () => {
    if (!remixers) return;
    const seed = 123;
    const sig = await remixers.methods.createMeme(seed).rpc();
    console.log(`✅ Success! Sig: ${sig}`);
  };

  const fetchMemes = async () => {
    if (!remixers) return;
    const foo = await connection.getParsedProgramAccounts(remixers.programId, {
      filters: [
        // {
        //   dataSize: 165, // number of bytes
        // },
        {
          memcmp: {
            offset: 8,
            bytes: bs58.encode(Uint8Array.from([7])),
          },
        },
      ],
    });
    console.log(foo);
  };

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt maxime
        esse officia? Sit quas cumque fugit tempore totam eveniet molestias
        quos. Non illum placeat architecto harum repudiandae ipsa suscipit
        minima.
      </p>

      {isClient && <WalletMultiButton />}

      <button type="button" onClick={() => initialize()}>
        initialize
      </button>
      <button type="button" onClick={() => createMeme()}>
        create meme
      </button>
      <button type="button" onClick={() => fetchMemes()}>
        fetch memes
      </button>
    </>
  );
}
