import { isRenderable } from "./1-isRenderable.js";
import { createFieldWrapper } from "./2-createFieldWrapper.js";
import { resolveElementTypes } from "./3-resolveElementTypes.js";
import { appendElements } from "./4-appendElements/index.js";

const buildField = ({ inData = [], inCol, inClasses = {} }) => {
    if (!isRenderable({ inCol })) {
        return null;
    }

    const formClasses = inClasses?.verticalForm || {};
    const footOptions = inCol?.options?.table?.tfoot?.inputsRow;

    const wrapper = createFieldWrapper({
        inWrapperClass: formClasses.wrapper
    });

    const elementTypes = resolveElementTypes({
        inCol,
        inFootOptions: footOptions
    });

    appendElements({
        inData,
        inCol,
        inFormClasses: formClasses,
        elementTypes,
        wrapper
    });

    return wrapper;
};

export { buildField };
