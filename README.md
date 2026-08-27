# KeshavSoft jsTableBuilderViews

[![Docs](https://img.shields.io/badge/Docs-GitHub%20Pages-blue)](https://keshavsoft.github.io/jsTableBuilderViews/)
[![NPM](https://img.shields.io/badge/NPM-table--builder--views-red.svg)](https://www.npmjs.com/package/table-builder-views)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/keshavsoft/jsTableBuilderViews)

> **A lightweight, JSON-driven JavaScript UI library for building data tables, forms, and dynamic views.**

### 🔗 Quick Navigation

**Documentation** · [Live Docs](https://keshavsoft.github.io/jsTableBuilderViews/)
**Package** · [NPM](https://www.npmjs.com/package/table-builder-views)
**Source** · [GitHub](https://github.com/keshavsoft/jsTableBuilderViews)

---

## 📌 What is jsTableBuilderViews?

**jsTableBuilderViews** is a declarative JavaScript UI library that helps developers generate data-driven interfaces using a simple configuration object.

Instead of manually creating table HTML, rows, columns, forms, filters, and related UI elements, you describe the required structure through JavaScript/JSON configuration.

The library then uses the configuration to build the required UI.

### Typical flow

```text
Configuration
     │
     ▼
 TableBuilder
     │
     ├── Data
     ├── Columns
     ├── Options
     └── Views
          │
          ▼
      Renderer
          │
          ├── Table
          ├── Vertical Form
          └── Other Views
          │
          ▼
       HTML UI
```

---

# ✨ Features

### 📋 Declarative Configuration

Define your table and form structure using JavaScript objects.

```javascript
const config = {
    htmlId: "app-root",
    data: myData,
    columns: myColumns,
    views: [
        {
            rendererType: "table"
        }
    ]
};
```

---

### 🧩 Multiple Renderers

The configuration can specify how the data should be displayed.

For example:

```javascript
views: [
    {
        rendererType: "table"
    }
]
```

The architecture supports different rendering approaches such as:

* Table
* Vertical Form
* Card-style views

---

### 🔎 Dynamic Filtering

The library provides configuration-driven support for filtering and managing table data without rebuilding unrelated parts of the page.

---

### 🧱 Web Components Integration

The library can work with custom web components from the **ks-web-components** ecosystem.

This makes it possible to use custom controls and components inside generated table/form interfaces.

---

### 🎨 Tailwind CSS Support

The generated starter HTML uses Tailwind CSS and provides a clean starting point for styling your application.

---

### 📖 Built-in Configuration Knowledge

You do not have to manually invent the complete configuration structure.

`TableBuilder` exposes helper methods for understanding and generating valid configuration.

```javascript
console.log(TableBuilder.describe());

const config = TableBuilder.sampleConfig();
```

---

# 🚀 Quick Start

There are two recommended ways to start using the library.

## Option 1 — Use the NPX Scaffolding Command

The easiest way to get started is:

```bash
npx table-builder-views init
```

### What does this command do?

The `init` command creates a **ready-to-run starter project in your current/root folder**.

The purpose of this command is to remove the initial setup work.

Instead of manually creating:

* `index.html`
* `renderStart.js`
* renderer files
* web component files
* configuration
* starter table code

the CLI prepares the project structure for you.

### Generated Project

After running:

```bash
npx table-builder-views init
```

your project will contain the required runtime files and a starter HTML page.

A simplified structure looks like:

```text
Your Project/
│
├── index.html
│
├── renderStart.js
│
├── renderStart/
│   ├── core/
│   │   ├── TableBuilder
│   │   ├── configuration helpers
│   │   └── sample configuration
│   │
│   ├── renderers/
│   │   ├── table
│   │   ├── vertical
│   │   └── card
│   │
│   └── dataFuncs/
│       ├── data normalization
│       └── column processing
│
└── webComponents/
    └── v12/
        └── custom web components
```

> **The main benefit of `npx table-builder-views init` is that you receive a complete starter HTML application instead of starting from an empty folder.**

---

# 🌐 What HTML File Does NPX Create?

The generated `index.html` acts as the **entry point for the starter application**.

The generated page includes:

1. Tailwind CSS
2. A container where the table is rendered
3. `renderStart.js` import
4. Example data
5. Example column definitions
6. `TableBuilder` configuration
7. Table rendering

The generated HTML uses:

```html
<div id="table-root"></div>
```

as the target container for the generated table.

It then imports:

```javascript
import { TableBuilder } from "./renderStart.js";
```

The starter file also contains example data and column definitions so that you can immediately understand how the library works.

Finally, it creates a `TableBuilder` instance and builds the table:

```javascript
const tableBuilder = new TableBuilder({
    htmlId: "table-root",
    data,
    columns,
    views: [
        {
            rendererType: "table",
            theme: "style1"
        }
    ]
});

tableBuilder.build();
```

---

# 🖥️ The Generated HTML is Your Starting Point

The HTML generated by the NPX command is **not just an example file**.

It is intended to be a starting point for your own application.

For example, the generated code contains:

```javascript
const data = [
    {
        name: "KeshavSoft",
        founder: "Keshav Nalam",
        website: "keshavsoft.github.io/jsTableBuilderViews",
        github: "github.com/keshavsoft/tableBuilderViews",
        npm: "npmjs.com/package/tableBuilderViews"
    }
];
```

You can replace this sample data with your own application data.

You can also modify:

```javascript
const columns = [
    {
        dataKey: "name",
        header: "Name",
        type: "string"
    }
];
```

to match your own data model.

---

# 📦 Option 2 — Use TableBuilder Directly

If you already have an HTML/JavaScript project, you can use the library directly without scaffolding a new project.

```javascript
import { TableBuilder } from "./renderStart.js";

const config = {
    htmlId: "app-root",

    data: [
        {
            id: 1,
            name: "Item A",
            category: "Electronics"
        },
        {
            id: 2,
            name: "Item B",
            category: "Books"
        }
    ],

    columns: [
        {
            dataKey: "name",
            header: "Item Name",
            options: {
                width: "150px",
                sortable: true,

                table: {
                    isVisible: true
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
                    isVisible: true
                }
            }
        }
    ],

    views: [
        {
            rendererType: "table"
        }
    ]
};

const builder = new TableBuilder(config);

await builder.build();
```

---

# 🧠 Understanding the Configuration

The main configuration is built around a few important concepts.

```text
config
│
├── htmlId
│      └── Where the UI should be rendered
│
├── data
│      └── Actual application records
│
├── columns
│      └── What fields should be displayed
│
├── table/options
│      └── Sorting, visibility, widths, inputs, etc.
│
└── views
       └── How the data should be rendered
```

### `htmlId`

Identifies the HTML element where the generated UI should appear.

```javascript
htmlId: "table-root"
```

### `data`

Contains the records that should be displayed.

```javascript
data: [
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" }
]
```

### `columns`

Defines the fields and headers displayed by the renderer.

```javascript
columns: [
    {
        dataKey: "name",
        header: "Name",
        type: "string"
    }
]
```

### `views`

Defines which renderer should be used.

```javascript
views: [
    {
        rendererType: "table"
    }
]
```

---

# 🔍 Getting Configuration Help

If you are not sure what properties are supported, use the built-in configuration helpers.

```javascript
import { TableBuilder } from "./renderStart.js";

console.log(TableBuilder.describe());
```

This is useful when you want to understand the available configuration structure.

You can also generate a starting configuration:

```javascript
const config = TableBuilder.sampleConfig();
```

Then attach your own data:

```javascript
config.data = myDataArray;
```

and build:

```javascript
const builder = new TableBuilder(config);

await builder.build();
```

---

# 🔗 Dependencies

The project works with **ks-web-components** for custom HTML elements used by the UI architecture.

For example, generated table cells can integrate with custom components such as:

```html
<ks-table-cell-content-common>
```

Make sure the required web-component runtime is available when your application uses those components.

---

# 📁 Project Architecture

At a high level, the project is organized into three important areas:

### `core`

Contains the main `TableBuilder` functionality and configuration-related logic.

### `renderers`

Contains the different UI rendering implementations.

```text
renderers/
├── table
├── vertical
└── card
```

### `dataFuncs`

Contains data normalization and column-processing functionality.

```text
dataFuncs/
├── data normalization
└── column processing
```

This separation keeps configuration, data processing, and UI rendering independent.

---

# 🛠️ Typical Development Workflow

A typical developer workflow looks like this:

```text
1. Create a project folder
          │
          ▼
2. Run NPX
   npx table-builder-views init
          │
          ▼
3. Starter files are generated
          │
          ▼
4. Open index.html
          │
          ▼
5. Replace sample data
          │
          ▼
6. Configure columns
          │
          ▼
7. Select renderer
          │
          ▼
8. Customize the UI
          │
          ▼
9. Build your application
```

---

# ⚡ Why Use the NPX Command?

Without the CLI, a developer may need to manually create and connect multiple files.

With:

```bash
npx table-builder-views init
```

the initial project setup is automated.

### Instead of:

```text
Create HTML
   ↓
Create JavaScript entry point
   ↓
Copy runtime files
   ↓
Copy web components
   ↓
Configure imports
   ↓
Create sample data
   ↓
Create columns
   ↓
Create TableBuilder
   ↓
Render table
```

### You can start with:

```bash
npx table-builder-views init
```

and then customize the generated project.

> **In short: NPX provides the starter application; TableBuilder provides the UI generation engine.**

---

# 📚 Documentation

### Live Documentation

[Open the Documentation Portal](https://keshavsoft.github.io/jsTableBuilderViews/)

### Configuration Reference

[Configuration Schema](https://keshavsoft.github.io/jsTableBuilderViews/configuration.html)

### Renderers

[Renderers Guide](https://keshavsoft.github.io/jsTableBuilderViews/renderers.html)

### Developer Documentation

See:

```text
DEV.md
```

for architecture and implementation details.

### How-To Documentation

See:

```text
HOWTO.md
```

for practical usage examples and tutorials.

---

# 📦 NPM

Install the package:

```bash
npm install table-builder-views
```

Or start a new project using:

```bash
npx table-builder-views init
```

[NPM Package](https://www.npmjs.com/package/table-builder-views)

---

# 🐙 Repository

Source code and development history are available on GitHub:

[GitHub Repository](https://github.com/keshavsoft/jsTableBuilderViews)

---

# 🌐 Documentation Website

The complete documentation is available here:

https://keshavsoft.github.io/jsTableBuilderViews/

---

# 🎯 Summary

**jsTableBuilderViews** provides a configuration-driven approach for generating JavaScript UI components.

The core idea is simple:

```text
Your Data
    +
Your Configuration
    ↓
TableBuilder
    ↓
Renderer
    ↓
Generated UI
```

For developers who want a quick start, use:

```bash
npx table-builder-views init
```

The NPX command creates the starter project and **generates the HTML entry page in the project root**, giving you an immediately understandable example that you can modify for your own application.

**Start with NPX → understand the generated HTML → customize data and columns → build your UI.**

---
## 🧪 Simple Sample HTML

If you want to understand how `jsTableBuilderViews` works before using the full configuration, start with the **simple HTML example**.

The generated `index.html` from:

```bash
npx table-builder-views init
```

provides a basic working example with sample data, columns, and a table renderer.

**Note:** This HTML file is intentionally simple so developers can quickly understand where `TableBuilder`, data, columns, and the renderer are connected.

---

## 📁 Simple HTML Example in `test`

A simple HTML table example is also available in the **`test` folder**.

The **previous/older version** contains a straightforward HTML table implementation that is useful for understanding the basic table structure before moving to the newer configuration-driven approach.

```text
test/
└── latest-version/
    └── index HTML table
```

**Note:** Use this example as a quick reference when you want to see a simple table implementation without going through the complete project architecture.

> **Tip:** Start with the simple HTML example, then look at the generated HTML from `npx table-builder-views init`, and finally move to the advanced configuration.

---

## 🚀 NPX in One Line

```bash
npx table-builder-views init
```

**Note:** This command creates the starter HTML and required project files in your project root, so you can immediately open the generated HTML and start experimenting with `TableBuilder`.

---

## 🧭 Recommended Learning Path

```text
Simple HTML Example
        ↓
test Folder Example
        ↓
npx table-builder-views init
        ↓
Generated index.html
        ↓
TableBuilder Configuration
        ↓
Custom Data & Columns
        ↓
Advanced Views
```

**Note:** This order makes it easier to understand the library gradually instead of starting with the complete configuration.

---

## 📌 README Section Style

Each section of this README should answer one simple question:

| Section        | Purpose                                |
| -------------- | -------------------------------------- |
| What is it?    | Understand the library                 |
| Features       | Know what it provides                  |
| NPX Command    | Create the html file             |
| Generated HTML | Understand what NPX creates            |
| Simple HTML    | See the basic concept                  |
| Test Folder    | See the previous/simple implementation |
| Configuration  | Understand `TableBuilder`              |
| Architecture   | Understand the project structure       |
| Documentation  | Find detailed references               |

**Note:** The README gives the developer the **short explanation**, while the detailed HTML documentation provides the complete configuration and API information.

---

## ⭐ KeshavSoft

Built for configuration-driven JavaScript UI development.

**Documentation:** https://keshavsoft.github.io/jsTableBuilderViews/
**NPM:** https://www.npmjs.com/package/table-builder-views
**GitHub:** https://github.com/keshavsoft/jsTableBuilderViews
