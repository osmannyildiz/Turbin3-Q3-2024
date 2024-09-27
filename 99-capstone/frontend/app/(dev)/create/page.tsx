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

    const seed = Math.ceil(Math.random() * Math.pow(2, 31));

    const sig = await remixers.methods.createMeme(seed, imageUrl).rpc();
    console.log(`✅ Success! Sig: ${sig}`);
    alert(
      "✅ Success! Navigate to the home page to see your creation listed (might need to refresh the page)."
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mb-4">Create a Meme</h1>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col max-w-[400px] mb-4">
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

      <div className="bg-slate-800 p-6 rounded-lg mt-8 flex items-center gap-8 w-fit">
        <img src="/images/coming-soon.jpg" alt="" className="h-48" />
        <div>
          <div className="text-4xl font-semibold mb-4">COMING SOON!</div>
          <ul className="text-lg">
            <li>👉 Upload image to our server</li>
            <li>👉 Upload image to Arweave</li>
            <li>👉 Add metadata (title, tags, etc.)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
