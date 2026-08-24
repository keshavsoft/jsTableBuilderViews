const createLabelElement = ({ inCol, inLabelClass }) => {
    const label = document.createElement("label");
    const labelText = inCol?.options?.verticalForm?.label || inCol?.label || inCol?.header || inCol?.dataKey || "";
    label.textContent = labelText;
    if (inLabelClass) label.className = inLabelClass;
    label.classList.add("ks-vertical-form-label");

    return label;
};

export { createLabelElement };
