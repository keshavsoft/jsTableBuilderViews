# Developer & Architecture Guide

> **Quick Cross-Navigation**: 
> 📄 [HTML Version (`docs/dev.html`)](https://keshavsoft.github.io/jsTableBuilderViews/dev.html) | 📖 [README.md](./README.md) | 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) | 💡 [HOWTO.md](./HOWTO.md) | 📦 [NPM Package](https://www.npmjs.com/package/table-builder-views) | 🐙 [GitHub Repo](https://github.com/keshavsoft/jsTableBuilderViews)

---

Welcome to the internal developer and architecture guide for `jsTableBuilderViews`. This document explains how the library engine is structured, how state is managed, and how custom components collaborate.

---

## 1. Codebase Domain Architecture

The codebase is split into two primary domains to ensure separation of concerns:

### A. `renderStart/core` (The Core Engine)
This is the brain of the application. The `TableBuilder` class (located in `renderStart/core/TableBuilder.js`) acts as the central coordinator:
* **Initialization**: Ingests raw JSON configuration, normalizes column properties, and flattens array objects.
* **State Management**: Holds single source of truth for original data (`this.originalData`) and active filtered data (`this.dataStore`).
* **DOM Tracking**: Tracks mounted DOM nodes (`this.viewNodes`), enabling selective partial updates without DOM destruction.
* **CDN Knowledge**: Exposes `TableBuilder.describe()` and `TableBuilder.sampleConfig()` for dynamic runtime schema discovery.

### B. `renderStart/renderers` (UI Layout Renderers)
Stateless presentation functions converting column schemas into semantic HTML UI:
* **`tableRenderer`**: Renders data grids with headers, footers, sorting, and inline controls.
* **`verticalRenderer`**: Renders input form controls used for dynamic table filtering.

---

## 2. Data Normalization (`setupDataStore`)

When data is passed into `TableBuilder`, deeply nested JSON objects are automatically flattened into single-level row maps.
For example, `item.details.stockitemname` becomes directly accessible via path `"details.stockitemname"`.

---

## 3. Web Components Integration (`<ks-table-cell-content-common>`)

To render dynamic input controls (dropdowns, date pickers, text fields) inside table cells, `tableRenderer` embeds standard HTML Custom Web Components provided by **[ks-web-components](https://github.com/keshavsoft/ks-web-components)**.

---

## 4. Dynamic Filtering Flow

1. User interacts with filter controls in a `verticalRenderer` form.
2. Form triggers button callback passing input values back to `TableBuilder`.
3. `TableBuilder.filterData()` filters the data store.
4. `RefreshManager.js` destroys *only* the old table DOM node and re-renders the new data grid. The vertical form remains untouched, preserving form state!

---

## 🌐 Documentation Links & References

* 📄 **HTML Developer Guide**: [docs/dev.html](https://keshavsoft.github.io/jsTableBuilderViews/dev.html)
* 📄 **HTML Ecosystem Architecture**: [docs/architecture.html](https://keshavsoft.github.io/jsTableBuilderViews/architecture.html)
* 📖 **Main README**: [README.md](./README.md)
* 💡 **How-To Tutorials**: [HOWTO.md](./HOWTO.md)
* 📦 **NPM Package**: [table-builder-views](https://www.npmjs.com/package/table-builder-views)
