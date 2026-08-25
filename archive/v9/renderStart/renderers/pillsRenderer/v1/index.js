export const PILLS_DEFAULTS = {
    pillsForm: {
        show: true,
        label: "Default Pills Form",
        style: "default"
    }
};

class pillsRenderer {
    static DEFAULTS = PILLS_DEFAULTS;

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
            "rendererType": "pills",
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

    buildPillsElement() {
        const container = document.createElement("div");
        container.className = "flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg shadow-inner";

        const colors = [
            "bg-blue-100 text-blue-800 border-blue-200",
            "bg-green-100 text-green-800 border-green-200",
            "bg-red-100 text-red-800 border-red-200",
            "bg-yellow-100 text-yellow-800 border-yellow-200",
            "bg-purple-100 text-purple-800 border-purple-200",
            "bg-pink-100 text-pink-800 border-pink-200",
            "bg-indigo-100 text-indigo-800 border-indigo-200"
        ];

        this.dataStore.data.forEach((row, index) => {
            // Usually pills just show one key thing. We'll combine a few columns for demonstration.
            const displayVal = this.dataStore.columns.slice(0, 2).map(c => row[c.dataDataField]).join(" - ");
            const colorClass = colors[index % colors.length];

            const pill = document.createElement("span");
            pill.className = `inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${colorClass} shadow-sm`;
            pill.textContent = displayVal || `Item ${index}`;

            container.appendChild(pill);
        });

        return container;
    };

    build() {
        const node = this.buildPillsElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.pillsRenderer = pillsRenderer;
window.ks.TableBuilder.renderers.pillsRenderer.version = "v1.0";

export { pillsRenderer };
