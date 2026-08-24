import { createInputGroup } from "./createInputGroup.js";
import { createElementByType } from "./createElementByType.js";

const appendElements = ({ inData = [], inCol, inFormClasses = {}, elementTypes = [], wrapper, onButtonClick }) => {
    const hasInput = elementTypes.includes("input");
    const hasButton = elementTypes.includes("button");
    const isGrouped = hasInput && hasButton && (inCol?.options?.verticalForm?.groupInputButton !== false);

    const inputGroup = isGrouped ? createInputGroup({ inGroupClass: inFormClasses.inputGroup }) : null;

    elementTypes.forEach(type => {
        const element = createElementByType({
            type,
            inData,
            inCol,
            inFormClasses,
            onButtonClick
        });

        if (!element) return;

        if (inputGroup && (type === "input" || type === "button")) {
            inputGroup.appendChild(element);
        } else {
            wrapper.appendChild(element);
        }
    });

    if (inputGroup) {
        wrapper.appendChild(inputGroup);
    }
};

export { appendElements };
