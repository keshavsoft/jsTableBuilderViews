import { resolveButtonOptions } from "./resolveButtonOptions.js";
import { applyButtonAttributes } from "./applyButtonAttributes.js";
import { attachButtonEvents } from "./attachButtonEvents.js";

const createButtonElement = ({ inCol, inButtonClass, inOnButtonClick }) => {
    const localCol = inCol;
    const localButtonClass = inButtonClass;
    const localOnButtonClick = inOnButtonClick;

    const resolvedOptions = resolveButtonOptions({ inCol: localCol, inButtonClass: localButtonClass });
    const button = document.createElement("button");

    applyButtonAttributes({ inButton: button, inResolvedOptions: resolvedOptions });
    
    attachButtonEvents({ 
        inButton: button, 
        inResolvedOptions: resolvedOptions, 
        inCol: localCol, 
        inOnButtonClick: localOnButtonClick 
    });

    return button;
};

export { createButtonElement };
