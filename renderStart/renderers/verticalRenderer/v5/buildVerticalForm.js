import { createContainerElement } from "./buildVerticalForm/1-createContainerElement.js";
import { createFieldWrapper } from "./buildVerticalForm/2-createFieldWrapper.js";
import { createLabelElement } from "./buildVerticalForm/3-createLabelElement.js";
import { prepareListData } from "./buildVerticalForm/4-prepareListData.js";
import { resolveFootOptions } from "./buildVerticalForm/5-resolveFootOptions.js";
import { createButtonElement } from "./buildVerticalForm/6-createButtonElement.js";
import { resolveFieldElements } from "./buildVerticalForm/7-resolveFieldElements.js";
import { createInputGroup } from "./buildVerticalForm/8-createInputGroup.js";
import { buildCellContent } from "./forFooter/v6/inputsRow/4-buildCellContent.js";

const buildVerticalFormElements = ({ inData = [], inColumns, inClasses = {} }) => {
    const formClasses = inClasses?.verticalForm || {
        container: "flex flex-col gap-4 p-4",
        wrapper: "flex flex-col",
        label: "font-bold mb-1",
        input: "border border-gray-300 rounded px-2 py-1 w-full",
        button: "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md",
        inputGroup: "flex flex-row items-center gap-2 w-full"
    };

    const container = createContainerElement({ inClasses });

    inColumns.forEach(col => {
        // Render fields for every column with a dataKey or explicit elements configuration
        if (col.dataKey || col.options?.verticalForm?.elements || col.options?.elements) {
            const footOptions = col.options?.table?.tfoot?.inputsRow;

            const wrapper = createFieldWrapper({
                inWrapperClass: formClasses.wrapper
            });

            const currentFootOptions = resolveFootOptions({
                inFootOptions: footOptions,
                inDefaultInputClass: formClasses.input
            });

            const elementTypes = resolveFieldElements({
                inCol: col,
                inFootOptions: currentFootOptions
            });
            console.log("elementTypes : ", elementTypes);

            const hasInput = elementTypes.includes("input");
            const hasButton = elementTypes.includes("button");
            const isGroupedInputButton = hasInput && hasButton && (col.options?.verticalForm?.groupInputButton !== false);

            let inputGroup = null;
            if (isGroupedInputButton) {
                inputGroup = createInputGroup({
                    inGroupClass: formClasses.inputGroup
                });
            }

            elementTypes.forEach(type => {
                if (type === "label") {
                    const label = createLabelElement({
                        inCol: col,
                        inLabelClass: formClasses.label
                    });
                    wrapper.appendChild(label);
                } else if (type === "input") {
                    const selectedArray = prepareListData({
                        inData,
                        inCol: col
                    });

                    const cellContent = buildCellContent({
                        inFootOptions: currentFootOptions,
                        inSummaryValue: "", // Empty for new entry
                        inListData: selectedArray
                    });

                    if (inputGroup) {
                        inputGroup.appendChild(cellContent);
                    } else {
                        wrapper.appendChild(cellContent);
                    }
                } else if (type === "button") {
                    const button = createButtonElement({
                        inCol: col,
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

            container.appendChild(wrapper);
        }
    });

    return container;
};

export { buildVerticalFormElements };
