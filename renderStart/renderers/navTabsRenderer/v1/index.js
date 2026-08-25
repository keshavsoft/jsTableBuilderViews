export const NAVTABS_DEFAULTS = {
    navTabsForm: {
        show: true,
        label: "Default Nav Tabs",
        style: "default"
    }
};

class navTabsRenderer {
    static DEFAULTS = NAVTABS_DEFAULTS;

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
            "rendererType": "navTabs",
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

    buildTabsElement() {
        const container = document.createElement("div");
        container.className = "w-full";

        // Create Tabs Header
        const tabsHeader = document.createElement("div");
        tabsHeader.className = "flex overflow-x-auto border-b border-gray-200 mb-4";
        
        // Create Tabs Content Container
        const tabsContent = document.createElement("div");
        tabsContent.className = "p-4 bg-white border border-gray-200 rounded-b-lg";

        const tabButtons = [];
        const tabPanels = [];

        this.dataStore.data.forEach((row, index) => {
            // Button
            const button = document.createElement("button");
            button.className = "whitespace-nowrap py-2 px-4 text-sm font-medium focus:outline-none " + 
                (index === 0 ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300");
            button.textContent = `Tab ${index + 1}`;
            tabButtons.push(button);
            tabsHeader.appendChild(button);

            // Panel
            const panel = document.createElement("div");
            panel.className = index === 0 ? "block" : "hidden";
            
            const grid = document.createElement("div");
            grid.className = "grid grid-cols-1 sm:grid-cols-2 gap-4";

            this.dataStore.columns.forEach(col => {
                const item = document.createElement("div");
                item.innerHTML = `<span class="block text-xs font-medium text-gray-500 uppercase">${col.dataDataField}</span>
                                  <span class="block text-sm text-gray-900">${row[col.dataDataField]}</span>`;
                grid.appendChild(item);
            });
            panel.appendChild(grid);
            tabPanels.push(panel);
            tabsContent.appendChild(panel);

            // Interaction
            button.addEventListener("click", () => {
                // Reset all
                tabButtons.forEach(btn => btn.className = "whitespace-nowrap py-2 px-4 text-sm font-medium focus:outline-none text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent");
                tabPanels.forEach(pnl => pnl.className = "hidden");
                
                // Activate clicked
                button.className = "whitespace-nowrap py-2 px-4 text-sm font-medium focus:outline-none text-indigo-600 border-b-2 border-indigo-600";
                panel.className = "block animate-fade-in";
            });
        });

        container.appendChild(tabsHeader);
        container.appendChild(tabsContent);

        return container;
    };

    build() {
        const node = this.buildTabsElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
// Merge any properties previously attached onto navTabsRenderer
Object.assign(navTabsRenderer, window.ks.TableBuilder.renderers.navTabsRenderer || {});

window.ks.TableBuilder.renderers.navTabsRenderer = navTabsRenderer;
window.ks.TableBuilder.renderers.navTabsRenderer.version = "v1.0";

export { navTabsRenderer };
