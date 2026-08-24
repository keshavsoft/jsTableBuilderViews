import { presentColumnData } from "../../../forFooter/v6/inputsRow/index.js";

const prepareListData = ({ inData = [], inCol }) => {
    const footOptions = inCol?.options?.table?.tfoot?.inputsRow;

    if (footOptions?.controlType === "datalist" || footOptions?.controlType === "select") {
        return presentColumnData(inData, inCol?.dataKey);
    }

    return [];
};

export { prepareListData };
