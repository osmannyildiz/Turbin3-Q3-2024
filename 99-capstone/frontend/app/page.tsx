"use client";

import useRemixers from "@/programs/useRemixers";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export default function Home() {
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
    const foo = await remixers.account.meme.all();
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
