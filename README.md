# KeshavSoft TableBuilder

TableBuilder is a lightweight, declarative Javascript UI library for generating complex data tables, vertical forms, and dynamic data filtering using a JSON-driven configuration approach.

## Features
- **Declarative Configuration**: Define your UI using a simple JSON structure.
- **Multiple Renderers**: Render data as interactive data grids (`table`) or input forms (`vertical`).
- **Dynamic Filtering**: Built-in state management for dynamically filtering tables without destroying the DOM of other components.
- **Web Components Integration**: Easily embed custom form inputs inside table cells using Web Components (`ks-table-cell-content-common-v5`).
- **Responsive Styling**: Tailwind CSS support built-in.

## Quick Start

### 1. Basic Setup
Ensure you have included `renderStart.js` (which exports the `TableBuilder` class) in your HTML file.

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
            DataAttribute: "name",
            DisplayName: "Item Name"
        },
        {
            DataAttribute: "category",
            DisplayName: "Category"
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
For exhaustive schema definitions and visual examples, view our HTML documentation:
- [Main Docs Landing Page](docs/index.html)
- [Configuration Schema](docs/configuration.html)
- [Renderers Guide](docs/renderers.html)
