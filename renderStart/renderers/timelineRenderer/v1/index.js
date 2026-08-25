export const TIMELINE_DEFAULTS = {
    timelineForm: {
        show: true,
        label: "Default Timeline Form",
        style: "default"
    }
};

class timelineRenderer {
    static DEFAULTS = TIMELINE_DEFAULTS;

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
            "rendererType": "timeline",
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

    buildTimelineElement() {
        const container = document.createElement("div");
        container.className = "p-6 w-full max-w-3xl mx-auto";

        const timelineWrap = document.createElement("div");
        timelineWrap.className = "relative border-l-2 border-indigo-200 ml-3";

        this.dataStore.data.forEach((row, index) => {
            const item = document.createElement("div");
            item.className = "mb-8 ml-6 relative";

            const dot = document.createElement("div");
            dot.className = "absolute -left-[35px] top-1 h-5 w-5 rounded-full bg-indigo-500 border-4 border-white shadow";
            item.appendChild(dot);

            const content = document.createElement("div");
            content.className = "bg-white p-4 rounded-lg shadow border border-gray-100";

            const title = document.createElement("h3");
            title.className = "font-bold text-gray-800 mb-2";
            title.textContent = `Event ${index + 1}`;
            content.appendChild(title);

            const grid = document.createElement("div");
            grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-2";

            this.dataStore.columns.forEach(col => {
                const field = document.createElement("div");
                field.innerHTML = `<span class="text-xs font-semibold text-gray-500 uppercase">${col.dataDataField}</span>
                                   <div class="text-sm text-gray-700">${row[col.dataDataField]}</div>`;
                grid.appendChild(field);
            });
            content.appendChild(grid);
            item.appendChild(content);
            timelineWrap.appendChild(item);
        });

        container.appendChild(timelineWrap);
        return container;
    };

    build() {
        const node = this.buildTimelineElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
// Merge any properties previously attached onto timelineRenderer
Object.assign(timelineRenderer, window.ks.TableBuilder.renderers.timelineRenderer || {});

window.ks.TableBuilder.renderers.timelineRenderer = timelineRenderer;
window.ks.TableBuilder.renderers.timelineRenderer.version = "v1.0";

export { timelineRenderer };
