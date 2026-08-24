const createLabelElement = ({ inCol, inLabelClass }) => {
    const rawLabel = inCol?.options?.verticalForm?.label;
    const labelOptions = typeof rawLabel === "object" && rawLabel !== null ? rawLabel : (typeof rawLabel === "string" ? { text: rawLabel } : {});

    const label = document.createElement("label");
    const labelText = labelOptions.text || labelOptions.label || inCol?.label || inCol?.header || inCol?.dataKey || "";
    label.textContent = labelText;

    const customClass = labelOptions.className || inLabelClass;
    if (customClass) label.className = customClass;
    label.classList.add("ks-vertical-form-label");

    if (labelOptions.id) label.id = labelOptions.id;
    if (labelOptions.for || labelOptions.htmlFor) label.htmlFor = labelOptions.for || labelOptions.htmlFor;

    return label;
};

export { createLabelElement };
