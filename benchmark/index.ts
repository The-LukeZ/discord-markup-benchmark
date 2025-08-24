// benchmark/benchmark.ts
import { Bench } from "tinybench";
import { marked } from "marked";
import { MarkupParser } from "../src/myParser"; // Adjust the import path
import fs from "fs";
import path from "path";

// --- 1. Setup ---
const bench = new Bench({ time: 100 }); // Run each task for 100ms

// --- 2. Load Test Data ---
const markdownContent = fs.readFileSync(
  path.join(import.meta.dirname, "test.md"),
  "utf-8"
);

// --- 3. Add Tasks to Benchmark ---
// The 'task' function is what gets measured.
bench
  .add("My Markdown Parser", () => {
    new MarkupParser().parse(markdownContent);
  })
  .add("marked", () => {
    marked.parse(markdownContent);
  });

// --- 4. Run and Display Results ---
async function runBenchmark() {
  console.log("Running benchmark...");
  await bench.run();

  console.table(bench.table());
}

runBenchmark();
