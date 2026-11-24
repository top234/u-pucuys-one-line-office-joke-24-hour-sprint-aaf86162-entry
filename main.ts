import { mkdirSync, writeFileSync } from "node:fs";

// One-line office joke (original, single sentence).
const JOKE =
  "Our daily standup is now 45 minutes long, seated, and weekly, so it's basically a meeting cosplaying as exercise.";

// Runtime guard: the gate requires UTF-8 text of 1-200 characters,
// not only whitespace, on a single line. Fail hard instead of
// submitting an invalid entry.
const chars = [...JOKE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${chars.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be whitespace-only");
}
if (/[\r\n]/.test(JOKE)) {
  throw new Error("joke must be a single line (no newline)");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, JOKE, "utf8");
