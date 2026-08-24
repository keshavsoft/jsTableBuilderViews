import { createContainerElement } from "./buildVerticalForm/forForm/createContainerElement.js";
import { buildField } from "./buildVerticalForm/forField/index.js";

const buildVerticalFormElements = ({ inData = [], inColumns = [], inClasses = {}, onButtonClick }) => {
    const container = createContainerElement({ inClasses });

    const handleButtonClick = (buttonData) => {
        const lineData = {};
        const { event } = buttonData;

        if (event && event.currentTarget) {
            // Traverse to the specific field (line) instead of the whole form
            const fieldContainer = event.currentTarget.closest(".ks-vertical-form-field");
            if (fieldContainer) {
                const inputs = fieldContainer.querySelectorAll("input, select, textarea, ks-table-cell-content-common-v5");
                inputs.forEach(input => {
                    const key = input.name || input.id;
                    if (key) {
                        lineData[key] = input.type === "checkbox" ? input.checked : input.value;
                    }
                });
            }
        }

        if (typeof onButtonClick === "function") {
            onButtonClick({
                ...buttonData,
                lineData,
                domContent: container
            });
        }
    };

    inColumns.forEach(col => {
        const fieldNode = buildField({
            inData,
            inCol: col,
            inClasses,
            onButtonClick: handleButtonClick
        });

        if (fieldNode) {
            container.appendChild(fieldNode);
        }
    });

    return container;
};

export { buildVerticalFormElements };
