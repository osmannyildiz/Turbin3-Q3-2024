"use client";

import useRemixers from "@/programs/useRemixers";
import { AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export default function Home() {
  // Anchor provider init
  // TODO Move these to a new component
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = new AnchorProvider(connection, wallet!, {
    commitment: "confirmed",
  });
  setProvider(provider);

  const remixers = useRemixers();

  // Don't render the wallet button on the server to avoid hydration error
  // Thanks Next.js, I hate this
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const initialize = async () => {
    const sig = await remixers.methods.initialize().rpc();
    console.log("Success! Check 'solana logs'.");
  };

  const createMeme = async () => {
    const seed = 123;
    const sig = await remixers.methods.createMeme(seed).rpc();
    console.log("Success! Check 'solana logs'.");
  };

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt maxime
        esse officia? Sit quas cumque fugit tempore totam eveniet molestias
        quos. Non illum placeat architecto harum repudiandae ipsa suscipit
        minima.
      </p>

      {isClient && <WalletMultiButton style={{}} />}

      <button type="button" onClick={() => initialize()}>
        initialize
      </button>
      <button type="button" onClick={() => createMeme()}>
        create meme
      </button>
    </>
  );
}
