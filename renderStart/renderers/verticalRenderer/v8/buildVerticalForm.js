import { createContainerElement } from "./buildVerticalForm/forForm/createContainerElement.js";
import { buildField } from "./buildVerticalForm/forField/index.js";

const buildVerticalFormElements = ({ inData = [], inColumns = [], inClasses = {}, onButtonClick }) => {
    const container = createContainerElement({ inClasses });

    inColumns.forEach(col => {
        const fieldNode = buildField({
            inData,
            inCol: col,
            inClasses,
            onButtonClick
        });

        if (fieldNode) {
            container.appendChild(fieldNode);
        }
    });

    return container;
};

export { buildVerticalFormElements };
