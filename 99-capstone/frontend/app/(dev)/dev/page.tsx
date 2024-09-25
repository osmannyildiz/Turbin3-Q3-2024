"use client";

import MemeGrid from "@/components/MemeGrid";
import useRemixers from "@/programs/useRemixers";
import { useStore } from "@/store";
import { Meme } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const remixers = useRemixers();
  const setIsShowSpinner = useStore((state) => state.setIsShowSpinner);

  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSpinner(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    fetchMemes();
  }, [remixers]);

  const fetchMemes = async () => {
    if (!remixers) return;
    const fetchedMemes = (await remixers.account.meme.all()).map((meme) => ({
      publicKey: meme.publicKey,
      ...meme.account,
    }));
    setMemes(fetchedMemes);
  };

  return (
    <>
      <MemeGrid memes={memes} className="max-w-[900px] mx-auto" />
    </>
  );
}
