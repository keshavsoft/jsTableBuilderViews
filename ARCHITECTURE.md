# Ecosystem Architecture & System Design

> **Quick Cross-Navigation**: 
> 📄 [HTML Version (`docs/architecture.html`)](https://keshavsoft.github.io/jsTableBuilderViews/architecture.html) | 📖 [README.md](./README.md) | 🛠️ [DEV.md](./DEV.md) | 💡 [HOWTO.md](./HOWTO.md) | 📦 [NPM Package](https://www.npmjs.com/package/table-builder-views) | 🐙 [GitHub Repo](https://github.com/keshavsoft/jsTableBuilderViews)

---

## 1. High-Level Architecture Overview

`jsTableBuilderViews` is a **declarative, JSON-driven UI orchestration engine**. It acts as the core presentation layer that turns raw business data (JSON) into interactive data grids, input forms, and dynamic filtering components.

```text
+-------------------------------------------------------------------------------+
|                             User Web Application                              |
+-------------------------------------------------------------------------------+
                                        |
       1. Supplies Raw Data & JSON Config | 2. Calls TableBuilder.appendToDom()
                                        v
+-------------------------------------------------------------------------------+
|                    jsTableBuilderViews (Orchestrator)                        |
|                                                                               |
|  +-------------------+  +---------------------+  +------------------------+  |
|  | setupDataStore()  |  | ViewOrchestrator.js |  |   RefreshManager.js    |  |
|  | (Data Flattener)  |  |  (Layout Renderer)  |  | (Targeted DOM Updater) |  |
|  +-------------------+  +---------------------+  +------------------------+  |
+-------------------------------------------------------------------------------+
                                        |
                   Renders Custom Input Cells & Styling Tokens
                                        v
+-------------------------------------------------------------------------------+
|                    ks-web-components (UI Component Layer)                     |
|                                                                               |
|  +-----------------------------------+  +----------------------------------+  |
|  | <ks-table-cell-content-common>    |  | Tailwind Design Token Registry   |  |
|  | Custom HTML Web Component         |  | PREDEFINED_TEXT_CLASSES          |  |
|  +-----------------------------------+  +----------------------------------+  |
+-------------------------------------------------------------------------------+
```

---

## 2. Core Responsibilities & Boundary Separation

| Domain Layer | Component / Module | Responsibility |
| :--- | :--- | :--- |
| **Data Engine** | `setupDataStore.js` | Flattens deeply nested JSON structures (e.g. `details.batch.name` &rarr; `details.batch.name`) into flat row maps. |
| **State Coordinator** | `TableBuilder.js` | Holds single source of truth for original data (`originalData`), filtered data (`dataStore`), and active DOM nodes (`viewNodes`). |
| **Renderer Engine** | `tableRenderer` & `verticalRenderer` | Stateless layout functions converting column schemas into semantic HTML elements. |
| **UI Custom Control** | `ks-web-components` | Web Components handling individual cell input controls (`select`, `datalist`, `date`, `checkbox`). |

---

## 3. Data Flow & Filtering Lifecycle

1. **Initialization**: User passes `config` object to `new TableBuilder(config)`.
2. **Flattening**: `setupDataStore` processes raw array data, resolving nested arrays and key paths.
3. **DOM Mounting**: `builder.appendToDom()` calls `ViewOrchestrator.js` to build table and vertical views into target DOM container (`htmlId`).
4. **Interactive Filtering**: User clicks a filter control inside `verticalRenderer`.
5. **State Update & Targeted DOM Refresh**: `filterData()` updates the active data store. `RefreshManager.js` destroys *only* the old table DOM node and re-renders the new table, keeping vertical form state completely intact.

---

## 4. Cross-Navigation Matrix

* 📖 **HTML Architecture Guide**: [architecture.html](https://keshavsoft.github.io/jsTableBuilderViews/architecture.html)
* 📖 **HTML Configuration Schema**: [configuration.html](https://keshavsoft.github.io/jsTableBuilderViews/configuration.html)
* 📖 **HTML CLI & NPM Scaffolding**: [npm-usage.html](https://keshavsoft.github.io/jsTableBuilderViews/npm-usage.html)
* 📖 **HTML Ecosystem Relationship**: [relationship.html](https://keshavsoft.github.io/jsTableBuilderViews/relationship.html)
* 🐙 **GitHub Repository**: [keshavsoft/jsTableBuilderViews](https://github.com/keshavsoft/jsTableBuilderViews)
* 📦 **NPM Registry**: [table-builder-views](https://www.npmjs.com/package/table-builder-views)
