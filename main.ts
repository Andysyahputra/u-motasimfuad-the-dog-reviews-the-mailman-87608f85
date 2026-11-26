// The Dog Reviews the Mailman
// Writes one funny one-line review a dog gives the mailman to
// /output/entry.txt. Deterministic: the same entry, byte for byte,
// on every run. Standard library only, no network, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "One star. He comes every day, teases me through the fence, and leaves. I have filed 400 complaints with the post office. They keep delivering them to him.";

// Validation guard: the gate requires UTF-8 text of 1 to 200 characters,
// not only whitespace. Fail loudly instead of writing an invalid entry.
const length = [...ENTRY].length;
if (length < 1 || length > 200) {
  throw new Error(
    `Entry length ${length} is outside the 1-200 character gate; refusing to write.`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry is only whitespace; refusing to write.");
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line; refusing to write.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
