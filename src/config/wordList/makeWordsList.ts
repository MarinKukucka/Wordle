import { existsSync, readFileSync, statSync, writeFileSync } from "fs";
import path from "path";

const rawArgs = process.argv.slice(2);

let folder: string | undefined;

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];

  if (arg.startsWith("--folder=")) {
    folder = arg.split("=")[1];
  }
}

if (!folder) {
  console.error("Missing required argument: --folder=NAME");
  console.error("Example: npx ts-node makeWordsList.ts --folder=english");
  process.exit(1);
}

try {
    const stats = statSync(folder);

    if (!stats.isDirectory()) {
        console.error(`"${folder}" exists but is not a folder.`);
        process.exit(1);
    }
} catch (err) {
    console.error(`Folder "${folder}" does not exist.`);
    process.exit(1);
}

const inputPath = path.join(folder, "words.txt");

if(!existsSync(inputPath)){
    console.error(`"words.txt" not found in folder "${folder}"`);
    process.exit(1);
}

const outputPath = path.join(folder, "words.ts");

if(existsSync(outputPath)){
    console.error(`"words.ts" already exists in folder "${folder}"`)
    process.exit(1);
}

const words = readFileSync(inputPath, "utf8")
  .split("\n")
  .filter(Boolean)
  .map(w => w.trim().toUpperCase());

const output = `export const WORDS = ${JSON.stringify(words, null, 2)};\n`;

writeFileSync(outputPath, output);

console.log(`Created ${outputPath} with ${words.length} words`);
