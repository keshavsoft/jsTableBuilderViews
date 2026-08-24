const createInputGroup = ({ inGroupClass }) => {
    const group = document.createElement("div");
    if (inGroupClass) group.className = inGroupClass;
    group.classList.add("ks-vertical-form-input-group");

    return group;
};

export { createInputGroup };
