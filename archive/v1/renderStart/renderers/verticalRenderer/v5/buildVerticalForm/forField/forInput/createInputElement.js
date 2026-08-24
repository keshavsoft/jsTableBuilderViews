import { prepareListData } from "./prepareListData.js";
import { resolveFootOptions } from "./resolveFootOptions.js";
import { buildCellContent } from "../../../forFooter/v6/inputsRow/4-buildCellContent.js";

const createInputElement = ({ inData = [], inCol, inFormClasses = {} }) => {
    const footOptions = inCol?.options?.table?.tfoot?.inputsRow;

    const currentFootOptions = resolveFootOptions({
        inCol,
        inFootOptions: footOptions,
        inDefaultInputClass: inFormClasses.input
    });

    const selectedArray = prepareListData({
        inData,
        inCol
    });

    return buildCellContent({
        inFootOptions: currentFootOptions,
        inSummaryValue: "", // Empty for new entry
        inListData: selectedArray
    });
};

export { createInputElement };
