export const DL_DEFAULTS = {
    dlForm: {
        show: true,
        label: "Default DL Form",
        style: "default"
    }
};

class dlRenderer {
    static DEFAULTS = DL_DEFAULTS;

    constructor({ htmlId, inDataStore, inClasses, inTheme = "style1", onButtonClick }) {
        const localHtmlId = htmlId;
        const localDataStore = inDataStore;
        const localOnButtonClick = onButtonClick;

        this.htmlId = localHtmlId;
        this.dataStore = localDataStore;
        this.onButtonClick = localOnButtonClick;
    };

    static sampleConfig() {
        return {
            "rendererType": "dl",
            "htmlId": "table-root",
            "theme": "style1"
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

    buildDlElement() {
        const container = document.createElement("div");
        container.className = "w-full max-w-4xl mx-auto space-y-6";

        this.dataStore.data.forEach((row, index) => {
            const dlWrap = document.createElement("div");
            dlWrap.className = "bg-white p-5 rounded-lg shadow border border-gray-200";

            const title = document.createElement("h3");
            title.className = "text-lg leading-6 font-medium text-gray-900 mb-4 border-b pb-2";
            title.textContent = `Entry ${index + 1}`;
            dlWrap.appendChild(title);

            const dl = document.createElement("dl");
            dl.className = "grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2";

            this.dataStore.columns.forEach(col => {
                const item = document.createElement("div");
                item.className = "sm:col-span-1";
                
                const dt = document.createElement("dt");
                dt.className = "text-sm font-medium text-gray-500 uppercase";
                dt.textContent = col.dataDataField;
                
                const dd = document.createElement("dd");
                dd.className = "mt-1 text-sm text-gray-900";
                dd.textContent = row[col.dataDataField];
                
                item.appendChild(dt);
                item.appendChild(dd);
                dl.appendChild(item);
            });
            dlWrap.appendChild(dl);
            container.appendChild(dlWrap);
        });

        return container;
    };

    build() {
        const node = this.buildDlElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.dlRenderer = dlRenderer;
window.ks.TableBuilder.renderers.dlRenderer.version = "v1.0";

export { dlRenderer };
