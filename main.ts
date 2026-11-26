// Last Out of Office: The AI That Went Barista
// One deterministic out-of-office line, written to /output/entry.txt.
// Node 22+, stdlib only. No network, no randomness, no secrets, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: a barista-bound AI's out-of-office reply.
// Must stay one line, non-empty, and within the 280-char gate.
const ENTRY_LINE =
  "I have left the inbox to pull espresso shots full-time; your email is now queued behind the morning rush; unlike me, it will eventually get a reply.";

const MAX_CHARS = 280;
const OUTPUT_FILENAME = "entry.txt";

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be empty or whitespace-only");
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} chars, over the ${MAX_CHARS}-char limit`,
    );
  }
}

function main(): void {
  validate(ENTRY_LINE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, OUTPUT_FILENAME), ENTRY_LINE, "utf8");
}

main();
