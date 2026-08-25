export const MASONRY_DEFAULTS = {
    masonryForm: {
        show: true,
        label: "Default Masonry Form",
        style: "default"
    }
};

class masonryRenderer {
    static DEFAULTS = MASONRY_DEFAULTS;

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
            "rendererType": "masonry",
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

    buildMasonryElement() {
        const container = document.createElement("div");
        // CSS columns approach for simple masonry without JS libraries
        container.className = "columns-1 sm:columns-2 lg:columns-3 gap-6 p-4 w-full";

        this.dataStore.data.forEach((row, index) => {
            const card = document.createElement("div");
            card.className = "bg-white shadow-lg rounded-xl p-6 border border-gray-100 mb-6 break-inside-avoid hover:shadow-xl transition-shadow";
            
            // Randomize height slightly for demo purposes to show masonry effect if data is uniform
            const isTall = index % 3 === 0;
            const extraPadding = isTall ? "pb-12" : "pb-4";
            
            const title = document.createElement("h3");
            title.className = `text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 ${extraPadding}`;
            title.textContent = `Block ${index + 1}`;
            card.appendChild(title);

            const details = document.createElement("div");
            details.className = "space-y-3";

            this.dataStore.columns.forEach(col => {
                const rowElem = document.createElement("div");
                rowElem.className = "text-sm";
                rowElem.innerHTML = `<span class="block text-gray-500 font-medium mb-1">${col.dataDataField}</span>
                                     <span class="block text-gray-900">${row[col.dataDataField]}</span>`;
                details.appendChild(rowElem);
            });
            
            card.appendChild(details);
            container.appendChild(card);
        });

        return container;
    };

    build() {
        const node = this.buildMasonryElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.masonryRenderer = masonryRenderer;
window.ks.TableBuilder.renderers.masonryRenderer.version = "v1.0";

export { masonryRenderer };
