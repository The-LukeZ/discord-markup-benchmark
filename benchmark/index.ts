import { Bench } from "tinybench";
import { marked } from "marked";
import { MarkupParser } from "../src/myParser";
import fs from "fs";
import path from "path";

const bench = new Bench({ time: 100 }); // Run each task for 100ms

const markdownContent = fs.readFileSync(
  path.join(import.meta.dirname, "test.md"),
  "utf-8"
);

bench
  .add("My Markdown Parser", () => {
    new MarkupParser().parse(markdownContent);
  })
  .add("marked", () => {
    marked.parse(markdownContent);
  });

async function runBenchmark() {
  console.log("Running benchmark...");
  await bench.run();

  console.table(bench.table());
}

runBenchmark();
