#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The directories and files to copy (relative to the package root, one level up from bin/)
const packageRoot = path.join(__dirname, '..');
const dirsToCopy = ['renderStart', 'webComponents'];
const filesToCopy = ['renderStart.js'];

function showHelp() {
    console.log(`
🚀 TableBuilderViews CLI
========================

TableBuilder is a lightweight, declarative Javascript UI library for generating complex data tables, vertical forms, and dynamic data filtering using a JSON-driven configuration approach.

Usage:
  npx table-builder-views <command>

Commands:
  init        Scaffolds the TableBuilder source components and a starter index.html in the current directory.
  help        Shows this help message.

Options:
  --help, -h  Shows this help message.

Example:
  npx table-builder-views init
`);
}

// Utility to recursively copy a directory
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function initScaffold() {
    console.log('📦 Installing tableBuilderViews source components...');

    try {
        for (const dir of dirsToCopy) {
            const sourceDir = path.join(packageRoot, dir);
            const targetDir = path.join(process.cwd(), dir);
            
            if (fs.existsSync(sourceDir)) {
                if (fs.existsSync(targetDir)) {
                    console.warn(\`⚠️  Target directory ./\${dir} already exists. Files will be overwritten.\`);
                }
                copyDirectory(sourceDir, targetDir);
                console.log(\`✅ Successfully copied \${dir} to ./\${dir}\`);
            } else {
                console.warn(\`⚠️ Source directory not found: \${sourceDir}. Skipping...\`);
            }
        }

        for (const file of filesToCopy) {
            const sourceFile = path.join(packageRoot, file);
            const targetFile = path.join(process.cwd(), file);
            if (fs.existsSync(sourceFile)) {
                fs.copyFileSync(sourceFile, targetFile);
                console.log(\`✅ Successfully copied \${file} to ./\${file}\`);
            }
        }

        // Scaffold a sample index.html
        const indexHtmlPath = path.join(process.cwd(), 'index.html');
        if (!fs.existsSync(indexHtmlPath)) {
            const templatePath = path.join(__dirname, 'template.html');
            if (fs.existsSync(templatePath)) {
                const indexHtmlContent = fs.readFileSync(templatePath, 'utf8');
                fs.writeFileSync(indexHtmlPath, indexHtmlContent);
                console.log(\`✅ Scaffolding complete: Created ./index.html starter file\`);
            } else {
                console.warn(\`⚠️ Could not find template.html at \${templatePath}. Skipping index.html creation.\`);
            }
        }

        console.log(\`\\nYou can now import and customize the TableBuilder directly from your own project!\`);
    } catch (error) {
        console.error(\`❌ Failed to copy files: \${error.message}\`);
        process.exit(1);
    }
}

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h') || args[0] === 'help') {
    showHelp();
} else if (args[0] === 'init') {
    initScaffold();
} else {
    console.error(\`❌ Unknown command: \${args[0]}\`);
    showHelp();
    process.exit(1);
}

