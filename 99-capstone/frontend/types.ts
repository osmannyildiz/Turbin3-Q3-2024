import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export interface Meme {
  publicKey: PublicKey;
  seed: number;
  maker: PublicKey;
  imageUrl: string;
  remixOf: PublicKey | null;
  supportersCount: number;
  totalRaisedLamports: BN;
  topSupporters: TopSupporters[];
  bump: number;
}

export interface TopSupporters {
  supporter: PublicKey;
  lamports: number;
}
