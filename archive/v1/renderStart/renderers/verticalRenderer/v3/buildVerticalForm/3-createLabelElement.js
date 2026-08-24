const createLabelElement = ({ inCol, inLabelClass }) => {
    const label = document.createElement("label");
    label.textContent = inCol?.label || inCol?.dataKey;
    if (inLabelClass) label.className = inLabelClass;

    return label;
};

export { createLabelElement };
