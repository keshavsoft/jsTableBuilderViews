# KeshavSoft TableBuilder

[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://keshavsoft.github.io/jsTableBuilderViews/)

TableBuilder is a lightweight, declarative Javascript UI library for generating complex data tables, vertical forms, and dynamic data filtering using a JSON-driven configuration approach.

## Features
- **Declarative Configuration**: Define your UI using a simple JSON structure.
- **Multiple Renderers**: Render data as interactive data grids (`table`) or input forms (`vertical`).
- **Dynamic Filtering**: Built-in state management for dynamically filtering tables without destroying the DOM of other components.
- **Web Components Integration**: Easily embed custom form inputs inside table cells using Web Components (`ks-table-cell-content-common-v5`).
- **Responsive Styling**: Tailwind CSS support built-in.
- **Self-Documenting**: You can call `TableBuilder.sampleConfig()` to get a complete, valid sample configuration object.

## Quick Start

### 1. Basic Setup
You can easily scaffold a project by running the npm CLI tool:

```bash
npx table-builder-views init
```

Or you can include `renderStart.js` (which exports the `TableBuilder` class) in your HTML file directly.

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
            header: "Item Name"
        },
        {
            dataKey: "category",
            header: "Category"
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
