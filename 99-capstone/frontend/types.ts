import { PublicKey } from "@solana/web3.js";

export interface Meme {
  publicKey: PublicKey;
  seed: number;
  maker: PublicKey;
  imageUrl: string;
  bump: number;
}
