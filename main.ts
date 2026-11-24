import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = process.env.MAKEFUN_OUTPUT_PATH || "/output/entry.txt";

const EXCUSE =
  'Your report was done at noon, then I spun up a reviewer agent, and we spent four hours replying "Great catch!" to each other on page one.';

export function renderExcuse(): string {
  const line = EXCUSE.replace(/\r?\n/g, " ").trim();
  const chars = [...line].length;
  const bytes = Buffer.byteLength(line, "utf8");
  if (chars < 1 || chars > 160 || !/\S/.test(line) || bytes > 160) {
    throw new Error(`Gate check failed: chars=${chars} bytes=${bytes}`);
  }
  return line;
}

function main(): void {
  const text = renderExcuse();
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

main();
