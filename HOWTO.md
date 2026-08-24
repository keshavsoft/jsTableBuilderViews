# How-To Tutorials

This guide provides step-by-step instructions for common tasks when working with TableBuilder.

## 1. How to Add a New Column to the Table

To add a new column, you simply need to update your `config.json` (or the `columns` array passed to the `TableBuilder` constructor).

```javascript
const columns = [
    // Existing column
    {
        DataAttribute: "customerName",
        DisplayName: "Customer Name"
    },
    // NEW Column
    {
        DataAttribute: "orderTotal",
        DisplayName: "Total Amount"
    }
];
```
> **Note**: The `DataAttribute` must exactly match the key in your JSON data. If the data is nested (e.g., `{ order: { total: 100 } }`), use dot notation: `"order.total"`.

## 2. How to Enable Data Filtering

To create a UI where a user can filter the table, you need to use **both** renderer types: a `vertical` form to hold the inputs, and a `table` to show the results.

In your `views` array, configure both:

```javascript
const views = [
    {
        rendererType: "vertical", // Renders the input form
        // ... vertical configuration ...
    },
    {
        rendererType: "table",    // Renders the data grid
        // ... table configuration ...
    }
];
```

Because `TableBuilder` handles the event wiring automatically, any button clicked inside the `vertical` form with the text "Filter" or "Submit" will automatically trigger the filtering logic on the `table` below it!

## 3. How to Apply Tailwind Themes

You can dynamically style your tables by passing a `theme` property in your view configuration. The renderers will apply the corresponding Tailwind utility classes.

```javascript
const views = [
    {
        rendererType: "table",
        theme: "dark" // or "light", "blue", etc.
    }
];
```
*(Ensure your CSS build system is compiling the necessary Tailwind classes for the theme).*

## Links
- [Back to README](./README.md)
- [Developer Guide](./DEV.md)
- [HTML Renderers Guide](docs/renderers.html)
