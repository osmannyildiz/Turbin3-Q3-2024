import { Meme } from "@/types";
import cn from "@/utils/classNamesHelper";
import MemeCard from "./MemeCard";

interface Props {
  memes: Meme[];
  className?: string;
}

export default function MemeGrid({ memes, className }: Props) {
  return (
    <div className={cn("grid grid-cols-3 gap-4 items-start", className)}>
      {memes.map((meme) => (
        <MemeCard key={meme.seed} meme={meme} />
      ))}
    </div>
  );
}
