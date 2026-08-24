import { createContainerElement } from "./buildVerticalForm/1-createContainerElement.js";
import { createFieldWrapper } from "./buildVerticalForm/2-createFieldWrapper.js";
import { createLabelElement } from "./buildVerticalForm/3-createLabelElement.js";
import { prepareListData } from "./buildVerticalForm/4-prepareListData.js";
import { resolveFootOptions } from "./buildVerticalForm/5-resolveFootOptions.js";
import { buildCellContent } from "./forFooter/v6/inputsRow/4-buildCellContent.js";

const buildVerticalFormElements = ({ inData = [], inColumns, inClasses = {} }) => {
    const formClasses = inClasses?.verticalForm || {
        container: "flex flex-col gap-4 p-4",
        wrapper: "flex flex-col",
        label: "font-bold mb-1",
        input: "border border-gray-300 rounded px-2 py-1 w-full"
    };

    const container = createContainerElement({ inClasses });

    inColumns.forEach(col => {
        // Render inputs for every column with a dataKey
        if (col.dataKey) {
            const footOptions = col.options?.table?.tfoot?.inputsRow;

            const wrapper = createFieldWrapper({
                inWrapperClass: formClasses.wrapper
            });

            const label = createLabelElement({
                inCol: col,
                inLabelClass: formClasses.label
            });

            const selectedArray = prepareListData({
                inData,
                inCol: col
            });

            const currentFootOptions = resolveFootOptions({
                inFootOptions: footOptions,
                inDefaultInputClass: formClasses.input
            });

            const cellContent = buildCellContent({
                inFootOptions: currentFootOptions,
                inSummaryValue: "", // Empty for new entry
                inListData: selectedArray
            });

            wrapper.appendChild(label);
            wrapper.appendChild(cellContent);
            container.appendChild(wrapper);
        }
    });

    return container;
};

export { buildVerticalFormElements };
