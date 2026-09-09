import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicRoot = join(projectRoot, "public");
const sourceRoot = join(projectRoot, "src");
const registryPath = join(sourceRoot, "data", "assets.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const errors = [];

const allowedExtensions = {
  image: new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]),
  icon: new Set([".ico", ".jpeg", ".jpg", ".png", ".svg"]),
  video: new Set([".mp4", ".webm"]),
};

for (const [key, asset] of Object.entries(registry)) {
  if (!asset.label || !asset.kind || !asset.src || typeof asset.alt !== "string") {
    errors.push(`${key}: label, kind, src, and alt are required`);
    continue;
  }

  if (!asset.src.startsWith("/") || asset.src.includes("..")) {
    errors.push(`${key}: src must be a root-relative path inside public`);
    continue;
  }

  const assetPath = join(publicRoot, asset.src.slice(1));
  try {
    if (!(await stat(assetPath)).isFile()) errors.push(`${key}: ${asset.src} is not a file`);
  } catch {
    errors.push(`${key}: missing file ${asset.src}`);
  }

  const extensions = allowedExtensions[asset.kind];
  if (!extensions) {
    errors.push(`${key}: unknown asset kind “${asset.kind}”`);
  } else if (!extensions.has(extname(asset.src).toLowerCase())) {
    errors.push(`${key}: ${asset.src} is not a supported ${asset.kind} format`);
  }
}

async function allFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await allFiles(path));
    if (entry.isFile()) files.push(path);
  }
  return files;
}

for (const path of (await allFiles(sourceRoot)).filter((file) => /\.(css|js|jsx|ts|tsx)$/.test(file))) {
  const source = await readFile(path, "utf8");
  if (/\/(?:brand|media|uploads)\//.test(source)) {
    errors.push(`${path.slice(projectRoot.length + 1)}: asset path bypasses src/data/assets.json`);
  }
}

const registeredPaths = new Set(
  Object.values(registry).map((asset) => asset.src.slice(1)),
);

for (const directory of ["brand", "media", "uploads"]) {
  for (const path of await allFiles(join(publicRoot, directory))) {
    const publicPath = path.slice(publicRoot.length + 1);
    if (!registeredPaths.has(publicPath) && !/\.(?:md|txt)$/.test(path) && !path.endsWith(".DS_Store")) {
      errors.push(`${publicPath}: file is not named in src/data/assets.json`);
    }
  }
}

if (errors.length) {
  console.error(`Asset check failed with ${errors.length} problem${errors.length === 1 ? "" : "s"}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Asset check passed: ${Object.keys(registry).length} named assets point to valid files.`);
}
