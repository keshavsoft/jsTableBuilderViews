import { prepareListData } from "./prepareListData.js";
import { resolveFootOptions } from "./resolveFootOptions.js";
// import { buildCellContent } from "../../../forFooter/v6/inputsRow/4-buildCellContent.js";

const buildCellContent = ({ inFootOptions = {}, inSummaryValue, inListData }) => {
    const localFootOptions = inFootOptions;
    const localSummaryValue = inSummaryValue;
    const cellContent = document.createElement("ks-table-cell-content-common");

    // Apply summary specific bold styling
    cellContent.style.fontWeight = "bold";
    // debugger;
    if (localSummaryValue !== "") {
        cellContent.inputs = {
            cellValue: localSummaryValue,
            options: {
                ...localFootOptions,
                listData: inListData
            }
        };
    } else {
        cellContent.inputs = {
            cellValue: "",
            options: {
                ...localFootOptions,
                listData: inListData
            }
        };
    };

    return cellContent;
};

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
