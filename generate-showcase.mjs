import { removeBackground } from "@imgly/background-removal";
import { readFile, writeFile } from "fs/promises";

const input = await readFile("./public/Sample Image 1.jpg");
const blob = new Blob([input], { type: "image/jpeg" });

console.log("Processing image… this may take a minute.");
const result = await removeBackground(blob);

const arrayBuffer = await result.arrayBuffer();
await writeFile("./public/Sample Image 1 tarnsparent.png", Buffer.from(arrayBuffer));
console.log("Done! Saved to public/Sample Image 1 tarnsparent.png");
