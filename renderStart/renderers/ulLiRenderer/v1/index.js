export const ULLI_DEFAULTS = {
    ulLiForm: {
        show: true,
        label: "Default List Form",
        style: "default"
    }
};

class ulLiRenderer {
    static DEFAULTS = ULLI_DEFAULTS;

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
            "rendererType": "ulLi",
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

    buildListElement() {
        const container = document.createElement("div");
        container.className = "p-4 bg-gray-50 rounded-lg";

        const ul = document.createElement("ul");
        ul.className = "space-y-4";

        this.dataStore.data.forEach((row, index) => {
            const li = document.createElement("li");
            li.className = "bg-white p-4 rounded-md shadow-sm border border-gray-200 list-none";

            const header = document.createElement("div");
            header.className = "font-semibold text-lg text-indigo-600 mb-2";
            header.textContent = `Record ${index + 1}`;
            li.appendChild(header);

            const innerUl = document.createElement("ul");
            innerUl.className = "list-disc list-inside text-gray-700 space-y-1 ml-2";

            this.dataStore.columns.forEach(col => {
                const innerLi = document.createElement("li");
                innerLi.innerHTML = `<span class="font-medium">${col.dataDataField}:</span> ${row[col.dataDataField]}`;
                innerUl.appendChild(innerLi);
            });

            li.appendChild(innerUl);
            ul.appendChild(li);
        });

        container.appendChild(ul);
        return container;
    };

    build() {
        const node = this.buildListElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
// Merge any properties previously attached onto ulLiRenderer
Object.assign(ulLiRenderer, window.ks.TableBuilder.renderers.ulLiRenderer || {});

window.ks.TableBuilder.renderers.ulLiRenderer = ulLiRenderer;
window.ks.TableBuilder.renderers.ulLiRenderer.version = "v1.0";

export { ulLiRenderer };
