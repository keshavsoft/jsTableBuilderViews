import { createLabelElement } from "../forLabel/createLabelElement.js";
import { createInputElement } from "../forInput/createInputElement.js";
import { createButtonElement } from "../forButton/createButtonElement.js";

const createElementByType = ({ type, inData, inCol, inFormClasses, onButtonClick }) => {
    switch (type) {
        case "label":
            return createLabelElement({
                inCol,
                inLabelClass: inFormClasses.label
            });

        case "input":
            return createInputElement({
                inData,
                inCol,
                inFormClasses
            });

        case "button":
            return createButtonElement({
                inCol,
                inButtonClass: inFormClasses.button,
                onButtonClick
            });

        default:
            return null;
    }
};

export { createElementByType };
