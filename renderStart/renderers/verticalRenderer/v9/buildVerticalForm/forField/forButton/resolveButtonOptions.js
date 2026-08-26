const resolveButtonOptions = ({ inCol, inButtonClass }) => {
    const localCol = inCol;
    const localButtonClass = inButtonClass;

    const rawButton = localCol?.options?.verticalForm?.button ?? localCol?.options?.button ?? localCol?.options?.table?.tfoot?.inputsRow?.button;
    const buttonOptions = typeof rawButton === "object" && rawButton !== null ? rawButton : (typeof rawButton === "string" ? { text: rawButton } : {});

    // Ensure we have resolved properties that other functions will need
    const text = buttonOptions.text || buttonOptions.label || localCol?.options?.buttonText || "Submit";
    const type = buttonOptions.type || "button";
    const customClass = buttonOptions.className || localButtonClass;

    return {
        ...buttonOptions,
        text,
        type,
        customClass
    };
};

export { resolveButtonOptions };
