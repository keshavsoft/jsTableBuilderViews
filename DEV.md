# Developer & Architecture Guide

Welcome to the internal architecture guide for `TableBuilder`. This document explains how the library is structured, how state is managed, and how the custom components work together.

## Codebase Architecture

The codebase is split into two primary domains to ensure separation of concerns:

### 1. `renderStart/core` (The Engine)
This is the brain of the application. The `TableBuilder` class (located in `renderStart/core/TableBuilder.js`) acts as the central coordinator. 
- **Initialization**: It takes the raw JSON configuration and normalizes the data.
- **State Management**: It holds the single source of truth for the data (`this.originalData`) and the currently filtered view of the data (`this.dataStore`).
- **DOM Tracking**: It tracks which DOM nodes belong to which UI elements (`this.viewNodes`), allowing it to selectively refresh parts of the page without destroying others.

### 2. `renderStart/renderers` (The UI Components)
These are completely stateless, dumb UI components. They receive data from the `TableBuilder` and simply render it.
- **`tableRenderer`**: Renders a complex HTML table using native DOM elements.
- **`verticalRenderer`**: Renders a vertical form, typically used for inputs or filtering.

By keeping the renderers isolated from the core logic, we can easily add new renderer types (e.g., `chartRenderer`) in the future without touching the `TableBuilder` class.

## Data Normalization (`setupDataStore`)
When data is passed into the `TableBuilder`, it often contains deeply nested JSON objects. To make rendering and filtering fast, the `setupDataStore` utility flattens these objects.

For example, `item.details.name` becomes accessible via the flattened string path `"details.name"`. This flattened data is what is passed to the renderers.

## Web Components (`KsTableCellContent`)
To handle complex inputs (like dropdowns, date pickers, or text fields) inside of our table cells, we use standard HTML Custom Web Components.

The component is defined in `webComponents/v5/KsTableCellContent.js`. When the `tableRenderer` needs to draw an interactive cell, it simply creates a `<ks-table-cell-content-common-v5>` tag and attaches the data. The Web Component handles its own internal state and event listeners.

## The Filtering Flow
1. A user clicks a "Filter" button inside a `verticalRenderer`.
2. The renderer fires an `onButtonClick` callback, passing the input values (the `lineData`) back to the `TableBuilder`.
3. `TableBuilder` runs `filterData()`, creating a new `this.dataStore` based on the filters.
4. `TableBuilder` runs `refreshTables()`. It looks at its DOM tracker (`this.viewNodes`), deletes *only* the old table node, and re-renders the new table. The vertical form is untouched, preserving the user's input!

## Links
- [Back to README](./README.md)
- [How-To Tutorials](./HOWTO.md)
- [HTML Configuration Docs](docs/configuration.html)
