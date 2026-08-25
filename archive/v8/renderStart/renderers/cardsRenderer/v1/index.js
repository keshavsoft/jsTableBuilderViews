export const CARDS_DEFAULTS = {
    cardsForm: {
        show: true,
        label: "Default Cards Form",
        style: "default"
    }
};

class cardsRenderer {
    static DEFAULTS = CARDS_DEFAULTS;

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
            "rendererType": "cards",
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

    buildCardsElement() {
        const container = document.createElement("div");
        container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4";

        this.dataStore.data.forEach((row, index) => {
            const card = document.createElement("div");
            card.className = "bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300";
            
            const title = document.createElement("h3");
            title.className = "text-xl font-semibold mb-4 text-gray-800";
            title.textContent = `Item #${index + 1}`;
            card.appendChild(title);

            const details = document.createElement("div");
            details.className = "space-y-2 text-sm text-gray-600";

            this.dataStore.columns.forEach(col => {
                const rowElem = document.createElement("div");
                rowElem.className = "flex justify-between border-b border-gray-100 pb-1";
                
                const key = document.createElement("span");
                key.className = "font-medium text-gray-700";
                key.textContent = col.dataDataField;
                
                const val = document.createElement("span");
                val.textContent = row[col.dataDataField];
                
                rowElem.appendChild(key);
                rowElem.appendChild(val);
                details.appendChild(rowElem);
            });
            card.appendChild(details);
            container.appendChild(card);
        });

        return container;
    };

    build() {
        const node = this.buildCardsElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.cardsRenderer = cardsRenderer;
window.ks.TableBuilder.renderers.cardsRenderer.version = "v1.0";

export { cardsRenderer };
