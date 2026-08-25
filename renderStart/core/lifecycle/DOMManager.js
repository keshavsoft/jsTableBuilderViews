export const DOMManager = {
    clearStage: (htmlId) => {
        const rootElement = document.getElementById(htmlId || "table-root");
        if (rootElement) {
            rootElement.innerHTML = '';
        }
    },
    
    mountView: async (htmlId, renderer, instance, rendererType) => {
        const rootElement = document.getElementById(htmlId || "table-root");
        if (!rootElement) return;

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
    },
    
    removeSpecificActors: (instance, typeToRemove) => {
        // Remove all old nodes of specific type from DOM
        instance.viewNodes.forEach(nodeObj => {
            if (nodeObj.type === typeToRemove && nodeObj.node && nodeObj.node.parentNode) {
                nodeObj.node.parentNode.removeChild(nodeObj.node);
            }
        });
        
        // Remove records from our tracker
        instance.viewNodes = instance.viewNodes.filter(n => n.type !== typeToRemove);
    }
};
