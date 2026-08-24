const resolveFootOptions = ({ inCol, inFootOptions, inDefaultInputClass }) => {
    const formInputOverride = inCol?.options?.verticalForm?.input || inCol?.options?.input || {};

    const baseOptions = inFootOptions ? { ...inFootOptions } : {
        showInput: true,
        controlType: "text",
        className: inDefaultInputClass
    };

    const mergedOptions = {
        ...baseOptions,
        ...formInputOverride
    };

    if (!mergedOptions.className) {
        mergedOptions.className = inDefaultInputClass;
    }

    return mergedOptions;
};

export { resolveFootOptions };
