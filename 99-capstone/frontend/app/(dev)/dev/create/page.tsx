"use client";

import useRemixers from "@/programs/useRemixers";
import { useStore } from "@/store";
import { useEffect } from "react";

export default function Create() {
  const remixers = useRemixers();
  const setIsShowSpinner = useStore((state) => state.setIsShowSpinner);

  useEffect(() => {
    setIsShowSpinner(false);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!remixers) {
      alert("Something went wrong! Please try again.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const imageUrl = formData.get("imageUrl") as string;

    const seed = Math.ceil(Math.random() * Math.pow(2, 32));

    const sig = await remixers.methods.createMeme(seed, imageUrl).rpc();
    console.log(`✅ Success! Sig: ${sig}`);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="text-black"
          />
        </div>

        <button
          type="submit"
          className="bg-red-800 text-white rounded-lg px-6 h-12 flex items-center"
        >
          Create!
        </button>
      </form>
    </>
  );
}
