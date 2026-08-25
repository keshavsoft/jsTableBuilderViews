export const KANBAN_DEFAULTS = {
    kanbanForm: {
        show: true,
        label: "Default Kanban Form",
        style: "default"
    }
};

class kanbanRenderer {
    static DEFAULTS = KANBAN_DEFAULTS;

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
            "rendererType": "kanban",
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

    buildKanbanElement() {
        const container = document.createElement("div");
        container.className = "flex overflow-x-auto space-x-4 p-4 bg-gray-100 min-h-[400px] rounded-lg";

        // For demo purposes, group by the first column or just randomly distribute
        const cols = ["To Do", "In Progress", "Done"];
        const boardCols = cols.map(c => {
            const colElem = document.createElement("div");
            colElem.className = "flex-shrink-0 w-72 bg-gray-200 rounded-md p-3 flex flex-col";
            const header = document.createElement("h3");
            header.className = "font-semibold text-gray-700 mb-3";
            header.textContent = c;
            colElem.appendChild(header);
            return colElem;
        });

        boardCols.forEach(c => container.appendChild(c));

        this.dataStore.data.forEach((row, index) => {
            const card = document.createElement("div");
            card.className = "bg-white p-3 rounded shadow-sm mb-3 border border-gray-300 hover:shadow-md cursor-pointer";
            
            const content = document.createElement("div");
            content.className = "text-sm text-gray-800 space-y-1";
            
            this.dataStore.columns.slice(0, 3).forEach(col => {
                const item = document.createElement("div");
                item.innerHTML = `<span class="font-medium">${col.dataDataField}:</span> ${row[col.dataDataField]}`;
                content.appendChild(item);
            });
            card.appendChild(content);

            // Put it in a pseudo-random column just for demonstration
            const targetCol = boardCols[index % 3];
            targetCol.appendChild(card);
        });

        return container;
    };

    build() {
        const node = this.buildKanbanElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.kanbanRenderer = kanbanRenderer;
window.ks.TableBuilder.renderers.kanbanRenderer.version = "v1.0";

export { kanbanRenderer };
