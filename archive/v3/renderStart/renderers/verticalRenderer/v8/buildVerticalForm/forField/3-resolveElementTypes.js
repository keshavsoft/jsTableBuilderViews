const resolveElementTypes = ({ inCol, inFootOptions }) => {
    // Check explicit elements array e.g. ["label", "input"], ["label", "button"]
    const explicitElements = inCol?.options?.verticalForm?.elements || inCol?.options?.elements;
    if (Array.isArray(explicitElements) && explicitElements.length > 0) {
        return explicitElements.map(el => el.toLowerCase().trim());
    }

    const elements = [];

    // 1. Label check (defaults to true)
    const showLabel = inCol?.options?.verticalForm?.showLabel ?? inCol?.options?.showLabel ?? true;
    if (showLabel) {
        elements.push("label");
    }

    // 2. Input check (defaults to true)
    const showInput = inCol?.options?.verticalForm?.showInput ?? inFootOptions?.showInput ?? true;
    if (showInput) {
        elements.push("input");
    }

    // 3. Button check
    const hasButton = Boolean(
        inCol?.options?.verticalForm?.button ||
        inCol?.options?.button ||
        inFootOptions?.button ||
        inCol?.options?.verticalForm?.showButton ||
        inFootOptions?.showButton
    );
    if (hasButton) {
        elements.push("button");
    }

    return elements;
};

export { resolveElementTypes };
