const createButtonElement = ({ inCol, inButtonClass }) => {
    const rawButton = inCol?.options?.verticalForm?.button ?? inCol?.options?.button ?? inCol?.options?.table?.tfoot?.inputsRow?.button;
    const buttonOptions = typeof rawButton === "object" && rawButton !== null ? rawButton : (typeof rawButton === "string" ? { text: rawButton } : {});

    const button = document.createElement("button");

    const text = buttonOptions.text || buttonOptions.label || inCol?.options?.buttonText || "Submit";
    button.textContent = text;
    button.type = buttonOptions.type || "button";

    const customClass = buttonOptions.className || inButtonClass;
    if (customClass) button.className = customClass;
    button.classList.add("ks-vertical-form-button");

    if (buttonOptions.id) button.id = buttonOptions.id;
    if (buttonOptions.name) button.name = buttonOptions.name;
    if (buttonOptions.title) button.title = buttonOptions.title;

    if (typeof buttonOptions.onClick === "function") {
        button.addEventListener("click", (e) => buttonOptions.onClick(e, { column: inCol }));
    }

    return button;
};

export { createButtonElement };
