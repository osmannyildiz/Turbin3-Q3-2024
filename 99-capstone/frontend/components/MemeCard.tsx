import { Meme } from "@/types";
import cn from "@/utils/classNamesHelper";
import Link from "next/link";

interface Props {
  meme: Meme;
  className?: string;
}

export default function MemeCard({ meme, className }: Props) {
  const makerAddress = meme.maker.toBase58();

  return (
    <Link
      href={`/dev/${meme.seed}`}
      className={cn(
        "bg-slate-800 rounded-lg p-2 flex flex-col gap-2",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-red-400 rounded-full"></div>
        <div>
          John Doe ({makerAddress.slice(0, 4)}...{makerAddress.slice(-4)})
        </div>
      </div>
      <img src={meme.imageUrl} alt="" className="w-full" />
      <div className="flex justify-between">
        <div className="flex">asd</div>
        <div className="flex">fgh</div>
      </div>
    </Link>
  );
}
