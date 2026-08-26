import { buildField } from "../forField/index.js";

const appendColumns = ({ inColumns = [], inData = [], inClasses = {}, inContainer, inOnButtonClick }) => {
    const localColumns = inColumns;
    const localData = inData;
    const localClasses = inClasses;
    const localContainer = inContainer;
    const localOnButtonClick = inOnButtonClick;

    localColumns.forEach(col => {
        const fieldNode = buildField({
            inData: localData,
            inCol: col,
            inClasses: localClasses,
            inOnButtonClick: localOnButtonClick
        });

        if (fieldNode) {
            localContainer.appendChild(fieldNode);
        }
    });
};

export { appendColumns };
