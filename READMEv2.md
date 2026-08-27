# KeshavSoft jsTableBuilderViews

[![Docs Site](https://img.shields.io/badge/Docs-GitHub%20Pages-blue)](https://keshavsoft.github.io/jsTableBuilderViews/)
[![NPM Package](https://img.shields.io/badge/NPM-table--builder--views-red.svg)](https://www.npmjs.com/package/table-builder-views)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/keshavsoft/jsTableBuilderViews)

> **Quick Navigation**: 📖 [Live Documentation Portal](https://keshavsoft.github.io/jsTableBuilderViews/) | 📦 [NPM Package Page](https://www.npmjs.com/package/table-builder-views) | 🐙 [GitHub Repository](https://github.com/keshavsoft/jsTableBuilderViews)

jsTableBuilderViews is a lightweight, declarative Javascript UI library for generating complex data tables, vertical forms, and dynamic data filtering using a JSON-driven configuration approach.

## Features
- **Declarative Configuration**: Define your UI using a simple JSON structure.
- **Multiple Renderers**: Render data as interactive data grids (`table`) or input forms (`vertical`).
- **Dynamic Filtering**: Built-in state management for dynamically filtering tables without destroying the DOM of other components.
- **Web Components Integration**: Easily embed custom form inputs inside table cells using Web Components (`ks-table-cell-content-common`).
- **Responsive Styling**: Tailwind CSS support built-in.
- **Self-Documenting**: You can call `TableBuilder.sampleConfig()` to get a complete, valid sample configuration object.

## Dependencies
This repository relies on the [ks-web-components](https://github.com/keshavsoft/ks-web-components) repository for its custom HTML elements (such as `ks-table-cell-content-common`). Ensure that the `ks-web-components` bundle is loaded on your page before using jsTableBuilderViews.

## Pulling Configuration Knowledge Directly from CDN
If you do not have a pre-existing `config.json` file, you do **not** need to invent custom configuration JSON from scratch. The `TableBuilder` class exports built-in methods to pull valid configuration knowledge and templates directly from the CDN:

```javascript
import { TableBuilder } from "https://keshavsoft.github.io/jsTableBuilderViews/renderStart.js";

// 1. Inspect schema metadata
console.log(TableBuilder.describe());

// 2. Pull valid configuration template directly from CDN
const config = TableBuilder.sampleConfig();

// 3. Attach your data and render
config.data = myDataArray;
const builder = new TableBuilder(config);
await builder.build();
```

## 🚀 CLI Scaffolding (`npx table-builder-views init`)

This repository (`jsTableBuilderViews`) includes built-in `npx` CLI support (`package.json` bin `table-builder-views`).

To scaffold a complete working project locally with zero setup, run:

```bash
npx table-builder-views init
```

### What `npx table-builder-views init` Scaffolds:
Running this command automatically copies the complete runtime architecture and knowledge from **both** `jsTableBuilderViews` and `ks-web-components` directly into your local project root:

```text
Your Project Root/
├── renderStart/                  # TableBuilder Engine, Renderers & Data Flatteners
│   ├── core/                     # TableBuilder Class, Describe & Sample Configs
│   ├── renderers/                # Table, Vertical & Card View Renderers
│   └── dataFuncs/                # Data Normalizers & Column Processors
├── webComponents/                # Custom HTML Elements & Styling Tokens (from ks-web-components)
│   └── v12/                      # <ks-table-cell-content-common> & Tailwind Token Maps
├── renderStart.js                # Main ES Module Entry Point
└── index.html                    # Pre-configured Starter HTML Template
```

---

## Quick Start

```javascript
import { TableBuilder } from "./renderStart.js";

const config = {
    htmlId: "app-root",
    data: [
        { id: 1, name: "Item A", category: "Electronics" },
        { id: 2, name: "Item B", category: "Books" }
    ],
    columns: [
        {
            dataKey: "name",
            header: "Item Name",
            options: {
                width: "150px",
                sortable: true,
                table: {
                    isVisible: true,
                    tfoot: {
                        summary: {},
                        inputsRow: {
                            showInput: true,
                            controlType: "select",
                            className: "w-48 border border-gray-300 rounded px-2 py-1"
                        }
                    }
                },
                verticalForm: {
                    elements: [
                        "label",
                        "input",
                        "button"
                    ]
                }
            }
        },
        {
            dataKey: "category",
            header: "Category",
            options: {
                width: "150px",
                sortable: true,
                table: {
                    isVisible: true,
                    tfoot: {
                        summary: {},
                        inputsRow: {
                            showInput: true,
                            controlType: "select",
                            className: "w-48 border border-gray-300 rounded px-2 py-1"
                        }
                    }
                },
                verticalForm: {
                    elements: [
                        "label",
                        "input",
                        "button"
                    ]
                }
            }
        }
    ],
    views: [
        {
            rendererType: "table" // Renders a standard table
        }
    ]
};

const builder = new TableBuilder(config);
await builder.build();
```

## Documentation
Dive deeper into the architecture, setup, and advanced configurations:

- [Developer Architecture Guide (`DEV.md`)](./DEV.md)
- [How-To Tutorials (`HOWTO.md`)](./HOWTO.md)

### Detailed HTML Docs
For exhaustive schema definitions and visual examples, view our live HTML documentation on GitHub Pages:
- [Main Docs Landing Page](https://keshavsoft.github.io/jsTableBuilderViews/)
- [Configuration Schema](https://keshavsoft.github.io/jsTableBuilderViews/configuration.html)
- [Renderers Guide](https://keshavsoft.github.io/jsTableBuilderViews/renderers.html)
