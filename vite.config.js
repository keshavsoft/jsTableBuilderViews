import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const archiveDir = path.join(__dirname, 'archive');
const archiveDirs = fs.existsSync(archiveDir) ? fs.readdirSync(archiveDir) : [];
const distDir = path.join(__dirname, 'dist');
const distDirs = fs.existsSync(distDir) ? fs.readdirSync(distDir) : [];

let maxV = 0;
const getVNumber = (name) => {
  const match = name.match(/^v(\d+)$/);
  return match ? parseInt(match[1], 10) : 0;
};

for (const dir of archiveDirs) {
  const v = getVNumber(dir);
  if (v > maxV) maxV = v;
}

// Calculate the next version by adding 1 to the highest version found in archive
const nextV = maxV + 1;

const targetDist = path.join(distDir, `v${nextV}`);
if (fs.existsSync(targetDist)) {
  console.error(`\n❌ Error: dist/v${nextV} already exists! Please delete it manually if you want to rebuild this version.\n`);
  process.exit(1);
}

export default defineConfig({
  build: {
    outDir: `dist/v${nextV}`,
    lib: {
      entry: 'renderStart.js',
      name: 'renderStart',
      fileName: 'renderStart'
    }
  }
});
