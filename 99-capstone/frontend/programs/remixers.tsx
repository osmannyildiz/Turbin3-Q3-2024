import { Program } from "@coral-xyz/anchor";
import idl from "../anchor-artifacts/idl/remixers.json";
import { Remixers } from "../anchor-artifacts/types/remixers";

export default new Program(idl as Remixers);
