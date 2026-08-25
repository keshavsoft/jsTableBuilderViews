export const ACCORDION_DEFAULTS = {
    accordionForm: {
        show: true,
        label: "Default Accordion Form",
        style: "default"
    }
};

class accordionRenderer {
    static DEFAULTS = ACCORDION_DEFAULTS;

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
            "rendererType": "accordion",
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

    buildAccordionElement() {
        const container = document.createElement("div");
        container.className = "w-full space-y-2";

        this.dataStore.data.forEach((row, index) => {
            const item = document.createElement("div");
            item.className = "border border-gray-200 rounded-lg overflow-hidden";

            // Header (Button)
            const headerBtn = document.createElement("button");
            headerBtn.className = "w-full flex justify-between items-center bg-gray-50 px-4 py-3 text-left focus:outline-none hover:bg-gray-100 transition-colors";
            headerBtn.innerHTML = `<span class="font-medium text-gray-900">Accordion Item ${index + 1}</span>
                                   <svg class="w-5 h-5 text-gray-500 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
            
            // Content Panel
            const panel = document.createElement("div");
            panel.className = "hidden px-4 py-3 bg-white border-t border-gray-200";
            
            const grid = document.createElement("div");
            grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4";

            this.dataStore.columns.forEach(col => {
                const field = document.createElement("div");
                field.innerHTML = `<span class="block text-xs font-semibold text-gray-500">${col.dataDataField}</span>
                                   <span class="block text-sm text-gray-800">${row[col.dataDataField]}</span>`;
                grid.appendChild(field);
            });
            panel.appendChild(grid);

            // Toggle Logic
            let isOpen = false;
            headerBtn.addEventListener("click", () => {
                isOpen = !isOpen;
                if (isOpen) {
                    panel.className = "block px-4 py-3 bg-white border-t border-gray-200";
                    headerBtn.querySelector("svg").classList.add("rotate-180");
                } else {
                    panel.className = "hidden px-4 py-3 bg-white border-t border-gray-200";
                    headerBtn.querySelector("svg").classList.remove("rotate-180");
                }
            });

            item.appendChild(headerBtn);
            item.appendChild(panel);
            container.appendChild(item);
        });

        return container;
    };

    build() {
        const node = this.buildAccordionElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.accordionRenderer = accordionRenderer;
window.ks.TableBuilder.renderers.accordionRenderer.version = "v1.0";

export { accordionRenderer };
