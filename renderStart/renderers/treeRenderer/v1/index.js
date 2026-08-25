export const TREE_DEFAULTS = {
    treeForm: {
        show: true,
        label: "Default Tree Form",
        style: "default"
    }
};

class treeRenderer {
    static DEFAULTS = TREE_DEFAULTS;

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
            "rendererType": "tree",
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

    buildTreeElement() {
        const container = document.createElement("div");
        container.className = "w-full max-w-2xl bg-white p-4 rounded-lg shadow font-sans border border-gray-200";

        const ul = document.createElement("ul");
        ul.className = "pl-4";

        const rootNode = document.createElement("li");
        rootNode.className = "mb-2";
        rootNode.innerHTML = `<span class="flex items-center text-gray-800 font-semibold">
            <svg class="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
            Dataset Root
        </span>`;

        const childrenUl = document.createElement("ul");
        childrenUl.className = "pl-6 mt-2 border-l border-gray-300 ml-2 space-y-2";

        this.dataStore.data.forEach((row, index) => {
            const item = document.createElement("li");
            item.className = "text-gray-700 relative";
            
            // Pseudo-element line for tree effect
            const line = document.createElement("span");
            line.className = "absolute -left-[25px] top-[10px] w-[20px] border-t border-gray-300";
            item.appendChild(line);

            const details = document.createElement("details");
            details.className = "group cursor-pointer";
            
            const summary = document.createElement("summary");
            summary.className = "font-medium hover:text-indigo-600 outline-none flex items-center";
            summary.innerHTML = `<svg class="w-4 h-4 mr-1 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> Row ${index + 1}`;
            details.appendChild(summary);

            const dataUl = document.createElement("ul");
            dataUl.className = "pl-8 mt-1 space-y-1 text-sm";
            
            this.dataStore.columns.forEach(col => {
                const dataLi = document.createElement("li");
                dataLi.className = "flex items-start";
                dataLi.innerHTML = `<span class="text-gray-400 mr-2">-</span>
                                    <span class="font-semibold mr-2">${col.dataDataField}:</span>
                                    <span>${row[col.dataDataField]}</span>`;
                dataUl.appendChild(dataLi);
            });
            details.appendChild(dataUl);

            item.appendChild(details);
            childrenUl.appendChild(item);
        });

        rootNode.appendChild(childrenUl);
        ul.appendChild(rootNode);
        container.appendChild(ul);

        return container;
    };

    build() {
        const node = this.buildTreeElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
// Merge any properties previously attached onto treeRenderer
Object.assign(treeRenderer, window.ks.TableBuilder.renderers.treeRenderer || {});

window.ks.TableBuilder.renderers.treeRenderer = treeRenderer;
window.ks.TableBuilder.renderers.treeRenderer.version = "v1.0";

export { treeRenderer };
