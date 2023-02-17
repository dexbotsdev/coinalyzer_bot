import honeypotAbi from "./honeypotChecker.js";
import bepAbi from "./simple-bep20.js";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const honeypotCheckerAbi = honeypotAbi;
export const bep20Abi = bepAbi;
