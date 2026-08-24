import { RENDERER_MAP } from "../TableBuilder.js";

export const refreshTables = async (instance) => {
    const rootElement = document.getElementById(instance.htmlId || "table-root");
    if (!rootElement) return;

    // 1. Remove all old table nodes from DOM
    instance.viewNodes.forEach(nodeObj => {
        if (nodeObj.type === "table" && nodeObj.node && nodeObj.node.parentNode) {
            nodeObj.node.parentNode.removeChild(nodeObj.node);
        }
    });
    
    // Remove table records from our tracker
    instance.viewNodes = instance.viewNodes.filter(n => n.type !== "table");

    // 2. Re-render only the table views
    for (const config of instance.views) {
        if (config.rendererType === "table") {
            await renderSingleView(instance, config);
        }
    }
};

export const renderSingleView = async (instance, config) => {
    const rendererType = config.rendererType || "vertical";
    const htmlId = instance.htmlId || "table-root";
    const theme = config?.theme;
    const rootElement = document.getElementById(htmlId);
    if (!rootElement) return;

    const RendererClass = RENDERER_MAP[rendererType];
    if (!RendererClass) return;

    const renderer = new RendererClass({
        htmlId,
        inDataStore: instance.dataStore,
        inTheme: theme,
        onButtonClick: (data) => {
            console.log("TableBuilder received from vertical button click:", data);
            const btnText = data.buttonText ? data.buttonText.toLowerCase() : "";
            if (btnText === "filter" || btnText === "submit") {
                instance.filterData(data.lineData);
                instance.refreshTables(); // <--- Only refresh tables to preserve form state!
            }
        }
    });
    
    // Temporarily intercept rootElement.appendChild to capture the node
    const originalAppendChild = rootElement.appendChild.bind(rootElement);
    let appendedNode = null;
    rootElement.appendChild = (node) => {
        appendedNode = node;
        return originalAppendChild(node);
    };

    await renderer.build();

    // Restore original appendChild
    rootElement.appendChild = originalAppendChild;

    if (appendedNode) {
        instance.viewNodes.push({ type: rendererType, node: appendedNode });
    }
};

export const appendToDom = async (instance) => {
    const rootElement = document.getElementById(instance.htmlId || "table-root");
    if (rootElement) {
        rootElement.innerHTML = '';
        instance.viewNodes = [];
    }

    for (const config of instance.views) {
        await renderSingleView(instance, config);
    }
};
