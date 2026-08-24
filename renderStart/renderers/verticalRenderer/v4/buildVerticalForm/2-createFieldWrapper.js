const createFieldWrapper = ({ inWrapperClass }) => {
    const wrapper = document.createElement("div");
    if (inWrapperClass) wrapper.className = inWrapperClass;
    wrapper.classList.add("ks-vertical-form-field");

    return wrapper;
};

export { createFieldWrapper };
