import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original one-line office joke: reply-all edition.
// Setup: trying to escape an email thread. Punchline: the escape
// attempt itself turns the speaker into the leader of the very
// crowd that made the same mistake.
const JOKE =
  "I hit reply-all asking to be removed from the thread, and now I run a support group for 47 people who did the same.";

const chars = [...JOKE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${chars.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be whitespace-only");
}
if (/[\r\n]/.test(JOKE)) {
  throw new Error("joke must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.log(`wrote ${chars.length}-character joke to ${join(outDir, "entry.txt")}`);
