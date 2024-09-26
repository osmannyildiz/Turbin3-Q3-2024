"use client";

import useRemixers from "@/programs/useRemixers";
import { useStore } from "@/store";
import { Meme } from "@/types";
import { BN } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";
import { useEffect, useState } from "react";
import Buffer from "tiny-buffer";

interface Props {
  params: {
    memeSeed: string;
  };
}

export default function MemeDetail({ params }: Props) {
  const remixers = useRemixers();
  const setIsShowSpinner = useStore((state) => state.setIsShowSpinner);

  const [meme, setMeme] = useState<Meme>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSpinner(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    fetchMeme();
  }, [remixers]);

  const fetchMeme = async () => {
    if (!remixers) return;

    const seed = Number(params.memeSeed);
    if (Number.isNaN(seed)) {
      alert("404 isnan");
      return;
    }

    const buf = new Buffer(4);
    buf.writeInt32LE(seed, 0);
    const fetchedMemes = (
      await remixers.account.meme.all([
        {
          memcmp: {
            offset: 8,
            bytes: bs58.encode(buf),
          },
        },
      ])
    ).map((meme) => ({
      publicKey: meme.publicKey,
      ...meme.account,
    }));
    const fetchedMeme = fetchedMemes[0];
    if (!fetchedMeme) {
      alert("404 no meme");
      return;
    }

    setMeme(fetchedMemes[0]);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!remixers || !meme) {
      alert("Something went wrong! Please try again.");
      return;
    }

    // const formData = new FormData(event.currentTarget);

    const sig = await remixers.methods
      .supportMeme(meme.seed, new BN(2.5 * LAMPORTS_PER_SOL))
      .accounts({
        maker: meme.maker,
      })
      .rpc();
    console.log(`✅ Success! Sig: ${sig}`);
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-[512px_1fr] gap-8">
        <img src={meme?.imageUrl} alt="" className="w-full" />
        <div className="flex flex-col gap-8">
          {/* meme info */}
          <ul>
            <li>Created by: {meme?.maker.toBase58()}</li>
            <li>Supported by: {meme?.supportersCount}</li>
            <li>Raised SOL: {meme?.totalRaisedLamports / LAMPORTS_PER_SOL}</li>
          </ul>

          {/* support form */}
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="amount">SOL Amount</label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-red-800 text-white rounded-lg px-6 h-12 flex items-center"
            >
              Support!
            </button>
          </form>

          {/* top supporters */}
          <table className="border">
            <thead>
              <tr className="text-left">
                <th>#</th>
                <th>Address</th>
                <th>SOL Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td>1</td>
                <td>TODO</td>
                <td>TODO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
