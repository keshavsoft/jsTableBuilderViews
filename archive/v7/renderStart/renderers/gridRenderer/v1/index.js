export const GRID_DEFAULTS = {
    gridForm: {
        show: true,
        label: "Default Grid Form",
        style: "default"
    }
};

class gridRenderer {
    static DEFAULTS = GRID_DEFAULTS;

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
            "rendererType": "grid",
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

    buildGridElement() {
        const container = document.createElement("div");
        container.className = "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4";

        this.dataStore.data.forEach((row, index) => {
            this.dataStore.columns.forEach(col => {
                const cell = document.createElement("div");
                cell.className = "bg-white p-3 shadow rounded border border-gray-200 flex flex-col justify-center items-center text-center";
                
                const key = document.createElement("span");
                key.className = "text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1";
                key.textContent = col.dataDataField;
                
                const val = document.createElement("span");
                val.className = "text-gray-800 text-sm";
                val.textContent = row[col.dataDataField];
                
                cell.appendChild(key);
                cell.appendChild(val);
                container.appendChild(cell);
            });
        });

        return container;
    };

    build() {
        const node = this.buildGridElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.gridRenderer = gridRenderer;
window.ks.TableBuilder.renderers.gridRenderer.version = "v1.0";

export { gridRenderer };
