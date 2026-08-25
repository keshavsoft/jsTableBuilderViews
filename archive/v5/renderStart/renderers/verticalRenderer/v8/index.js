import { buildVerticalFormElements } from "./buildVerticalForm.js";
import { mergeClasses } from "./mergeClasses.js";

export const VERTICAL_DEFAULTS = {
    verticalForm: {
        show: true,
        label: "Default Vertical Form",
        style: "default"
    }
};

class verticalRenderer {
    static DEFAULTS = VERTICAL_DEFAULTS;

    constructor({ htmlId, inDataStore, inClasses, inTheme = "style1", onButtonClick }) {
        this.htmlId = htmlId;
        this.dataStore = inDataStore;
        this.classes = mergeClasses({ inClasses, inTheme });
        this.onButtonClick = onButtonClick;
    };

    static sampleConfig() {
        return {
            "rendererType": "vertical",
            "htmlId": "table-root",
            "theme": "style2"
        };
    }

    appendToDom(controlToInsert) {
        const root = document.getElementById(this.htmlId);
        if (!root) {
            console.error(`Element with id '${this.htmlId}' not found.`);
            return;
        }

        root.appendChild(controlToInsert);
    };

    buildVerticalFormElement() {
        return buildVerticalFormElements({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this?.classes,
            onButtonClick: this.onButtonClick
        });
    };

    build() {
        const verticalFormNode = this.buildVerticalFormElement();
        return this.appendToDom(verticalFormNode);
    };
};

window.ks = window.ks || {};

window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.verticalRenderer = verticalRenderer;
window.ks.TableBuilder.renderers.verticalRenderer.version = "v5.0";

export { verticalRenderer };
