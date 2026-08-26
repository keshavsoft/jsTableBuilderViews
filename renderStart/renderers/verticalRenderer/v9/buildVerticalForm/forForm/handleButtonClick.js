import { extractLineData } from "./extractLineData.js";

const handleButtonClick = ({ inButtonData, inContainer, inOnButtonClick }) => {
    const localButtonData = inButtonData;
    const localContainer = inContainer;
    const localOnButtonClick = inOnButtonClick;
    
    const { event } = localButtonData;
    const lineData = extractLineData({ inEvent: event });

    console.log("nnnnnnnnnn : ", localOnButtonClick, lineData, localButtonData);

    if (typeof localOnButtonClick === "function") {
        localOnButtonClick({
            ...localButtonData,
            lineData,
            domContent: localContainer
        });
    }
};

export { handleButtonClick };
