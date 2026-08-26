import { createContainerElement } from "./buildVerticalForm/forForm/createContainerElement.js";
import { appendColumns } from "./buildVerticalForm/forForm/appendColumns.js";
import { handleButtonClick } from "./buildVerticalForm/forForm/handleButtonClick.js";

const buildVerticalFormElements = ({ inData = [], inColumns = [], inClasses = {}, inOnButtonClick }) => {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localOnButtonClick = inOnButtonClick;

    const container = createContainerElement({ inClasses: localClasses });

    const handleButtonClickCb = (buttonData) => {
        handleButtonClick({
            inButtonData: buttonData,
            inContainer: container,
            inOnButtonClick: localOnButtonClick
        });
    };

    appendColumns({
        inColumns: localColumns,
        inData: localData,
        inClasses: localClasses,
        inContainer: container,
        inOnButtonClick: handleButtonClickCb
    });

    return container;
};

export { buildVerticalFormElements };
