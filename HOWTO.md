# How-To Tutorials & Practical Recipes

> **Quick Cross-Navigation**: 
> 📄 [HTML Version (`docs/howto.html`)](https://keshavsoft.github.io/jsTableBuilderViews/howto.html) | 📖 [README.md](./README.md) | 🛠️ [DEV.md](./DEV.md) | 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) | 📦 [NPM Package](https://www.npmjs.com/package/table-builder-views) | 🐙 [GitHub Repo](https://github.com/keshavsoft/jsTableBuilderViews)

---

This guide provides step-by-step practical recipes for common developer tasks when working with `TableBuilder`.

---

## 1. How to Add a New Column to the Table

Update your `config.json` (or the `columns` array passed to `new TableBuilder(config)`):

```javascript
const columns = [
    {
        dataKey: "customerName",
        header: "Customer Name"
    },
    // NEW Column
    {
        dataKey: "orderTotal",
        header: "Total Amount",
        options: { width: "120px", sortable: true }
    }
];
```
> **Tip**: If data is nested (e.g., `{ order: { total: 100 } }`), use dot notation: `"order.total"`.

---

## 2. How to Enable Dynamic Data Filtering

Configure **both** renderer types in your `views` array:

```javascript
const views = [
    {
        rendererType: "vertical", // Input form view
    },
    {
        rendererType: "table",    // Data grid view
    }
];
```

Clicking any button with text `"Filter"` or `"Submit"` inside the `vertical` form automatically triggers dynamic table filtering.

---

## 3. How to Pull Configuration Knowledge from CDN when config.json is Missing

```javascript
import { TableBuilder } from "https://keshavsoft.github.io/jsTableBuilderViews/renderStart.js";

// Pull sample config template directly from CDN
const config = TableBuilder.sampleConfig();
config.data = myDataArray;

const builder = new TableBuilder(config);
await builder.build();
```

---

## 🌐 Documentation Links & References

* 📄 **HTML How-To Guide**: [docs/howto.html](https://keshavsoft.github.io/jsTableBuilderViews/howto.html)
* 📖 **Main README**: [README.md](./README.md)
* 🛠️ **Developer Guide**: [DEV.md](./DEV.md)
* 📦 **NPM Package Page**: [table-builder-views](https://www.npmjs.com/package/table-builder-views)
