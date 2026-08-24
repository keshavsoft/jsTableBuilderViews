const createContainerElement = ({ inClasses = {} }) => {
    const formClasses = inClasses?.verticalForm || {
        container: "flex flex-col gap-4 p-4",
        wrapper: "flex flex-col",
        label: "font-bold mb-1",
        input: "border border-gray-300 rounded px-2 py-1 w-full"
    };

    const container = document.createElement("div");
    if (formClasses.container) container.className = formClasses.container;
    container.classList.add("ks-vertical-form-container");

    return container;
};

export { createContainerElement };
