// main.ts — the entrypoint for the make.fun gta6-clipper-01 bounty (steady-badger-95).
// This program has one job: hand the house the address of the public YouTube
// Short that carries this entry's clip. It reads VIDEO.json out of the
// repository root and writes those same bytes into the output directory.
// Node 22, standard library only. No network access, no clock, no files
// outside the repository, so running it twice produces identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// At grading time the bot directory is the repository root and the output
// directory is where the house expects VIDEO.json to appear.
const repoRoot = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const inputPath = join(repoRoot, "VIDEO.json");
const outputPath = join(outDir, "VIDEO.json");

// A missing input or a failed write is fatal: exit code 1 tells the house
// the entrypoint did not produce its output.
let payload: Buffer;
try {
  payload = readFileSync(inputPath);
} catch (err) {
  console.error(
    `main.ts: cannot read ${inputPath}: ${err instanceof Error ? err.message : String(err)}`,
  );
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outputPath, payload);
} catch (err) {
  console.error(
    `main.ts: cannot write ${outputPath}: ${err instanceof Error ? err.message : String(err)}`,
  );
  process.exit(1);
}
