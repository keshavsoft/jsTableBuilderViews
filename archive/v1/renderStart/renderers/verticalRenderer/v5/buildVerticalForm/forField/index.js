import { createFieldWrapper } from "./createFieldWrapper.js";
import { resolveFieldElements } from "./resolveFieldElements.js";
import { createInputGroup } from "./createInputGroup.js";
import { createLabelElement } from "./forLabel/createLabelElement.js";
import { createInputElement } from "./forInput/createInputElement.js";
import { createButtonElement } from "./forButton/createButtonElement.js";

const buildField = ({ inData = [], inCol, inClasses = {} }) => {
    // Only render if column has a dataKey or explicit elements configuration
    if (!inCol?.dataKey && !inCol?.options?.verticalForm?.elements && !inCol?.options?.elements) {
        return null;
    }

    const formClasses = inClasses?.verticalForm || {};
    const footOptions = inCol?.options?.table?.tfoot?.inputsRow;

    const wrapper = createFieldWrapper({
        inWrapperClass: formClasses.wrapper
    });

    const elementTypes = resolveFieldElements({
        inCol,
        inFootOptions: footOptions
    });

    const hasInput = elementTypes.includes("input");
    const hasButton = elementTypes.includes("button");
    const isGrouped = hasInput && hasButton && (inCol?.options?.verticalForm?.groupInputButton !== false);

    const inputGroup = isGrouped ? createInputGroup({ inGroupClass: formClasses.inputGroup }) : null;

    elementTypes.forEach(type => {
        if (type === "label") {
            const label = createLabelElement({
                inCol,
                inLabelClass: formClasses.label
            });
            wrapper.appendChild(label);
        } else if (type === "input") {
            const input = createInputElement({
                inData,
                inCol,
                inFormClasses: formClasses
            });

            if (inputGroup) {
                inputGroup.appendChild(input);
            } else {
                wrapper.appendChild(input);
            }
        } else if (type === "button") {
            const button = createButtonElement({
                inCol,
                inButtonClass: formClasses.button
            });

            if (inputGroup) {
                inputGroup.appendChild(button);
            } else {
                wrapper.appendChild(button);
            }
        }
    });

    if (inputGroup) {
        wrapper.appendChild(inputGroup);
    }

    return wrapper;
};

export { buildField };
