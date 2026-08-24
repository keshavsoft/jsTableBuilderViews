const resolveFootOptions = ({ inFootOptions, inDefaultInputClass }) => {
    const currentFootOptions = inFootOptions ? { ...inFootOptions } : {
        showInput: true,
        controlType: "text",
        className: inDefaultInputClass
    };

    if (!currentFootOptions.className) {
        currentFootOptions.className = inDefaultInputClass;
    }

    return currentFootOptions;
};

export { resolveFootOptions };
