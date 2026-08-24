const createButtonElement = ({ inCol, inButtonClass, onButtonClick }) => {
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

    button.addEventListener("click", (e) => {
        if (typeof buttonOptions.onClick === "function") {
            buttonOptions.onClick(e, { column: inCol });
        }

        if (typeof onButtonClick === "function") {
            onButtonClick({ column: inCol, buttonText: text, event: e });
        }
    });

    return button;
};

export { createButtonElement };
