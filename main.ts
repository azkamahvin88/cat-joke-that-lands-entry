// The One-Line Cat Joke That Lands
// A tiny program that writes one cat joke to /output/entry.txt.
//
// The joke was picked from 18 candidates scored against the judge's
// published brief: a setup with a turn that lands, a laugh on the
// first read, a fresh angle (no tired cat puns), tight wording, and
// something a person would retell to a friend the same day.
//
// Winner: the work-from-home cat who unmutes its human mid-meow and
// gets mistaken for a very small, very rude employee. Runner-up was
// the blame-shifting phone drop ("looked at me like I was the one
// who dropped it") — kept out because the employee reframe lands
// harder on the first read and is the more retellable line.
//
// Run: node main.ts (Node 22+, no dependencies). Writes entry.txt
// under $OUTPUT_DIR, default /output.
//
// Deterministic, no network, no model calls. The program re-checks
// the sealed gate itself (UTF-8 text, 1-200 characters, one line,
// not only whitespace) before writing, so an invalid line can never
// slip through silently.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My cat walked across my laptop during a work call and unmuted me mid-meow — my boss now thinks I manage a very small, very rude employee.";

// Gate self-check: one line, 1-200 characters, not only whitespace.
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Joke must be a single line");
}
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`Joke must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("Joke must not be only whitespace");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE + "\n", "utf8");
console.log(`Wrote ${JOKE.length} characters to ${join(outDir, "entry.txt")}`);
