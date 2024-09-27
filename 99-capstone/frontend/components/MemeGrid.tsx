import { Meme } from "@/types";
import cn from "@/utils/classNamesHelper";
import MemeCard from "./MemeCard";

interface Props {
  memes?: Meme[];
  className?: string;
}

export default function MemeGrid({ memes, className }: Props) {
  if (!memes) {
    return <div className="text-center mx-auto">Loading... (connect your wallet if you didn&apos;t)</div>;
  }

  if (memes.length === 0) {
    return (
      <div className="flex flex-col items-center text-center mx-auto">
        <img src="/images/no-memes.jpg" alt="" className="h-64 mb-3" />
        <div className="text-3xl mb-2">We ain&apos;t got no memes.</div>
        <p>That&apos;s kinda cringe. Let&apos;s fix that by creating a meme.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-3 gap-4 items-start", className)}>
      {memes.map((meme) => (
        <MemeCard key={meme.seed} meme={meme} />
      ))}
    </div>
  );
}
