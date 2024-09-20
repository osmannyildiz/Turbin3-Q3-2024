"use client";

import { useStore } from "@/store";
import cn from "@/utils/classNamesHelper";
import JustX from "./JustX";
import styles from "./Spinner.module.css";

export default function Spinner() {
  const isShowSpinner = useStore((state) => state.isShowSpinner);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black flex justify-center items-center",
        !isShowSpinner && "hidden"
      )}
    >
      <div className="relative w-fit">
        <JustX height={256} className={styles.zero} />
        <JustX height={256} className={styles.one} />
        <JustX height={256} className={styles.two} />
      </div>
    </div>
  );
}
