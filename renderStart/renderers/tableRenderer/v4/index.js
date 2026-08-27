import { buildTable } from "./buildTable/index.js";
import { mergeClasses } from "./mergeClasses.js";
import { verticalRenderer } from "../../verticalRenderer/v9/index.js";

class tableRenderer {
    constructor({ htmlId, inDataStore, inTheme, inClasses }) {
        this.htmlId = htmlId;
        this.dataStore = inDataStore;

        this.classes = mergeClasses({ inClasses, inTheme });
    };

    static sampleConfig() {
        return {
            "rendererType": "table",
            "htmlId": "table-root",
            "theme": "style4"
        };
    }

    appendToDom(controlToInsert) {
        const root = document.getElementById(this.htmlId);
        if (!root) {
            console.error(`Element with id '${instance.htmlId}' not found.`);
            return;
        }

        root.appendChild(controlToInsert);
    };

    buildTableElements() {
        return buildTable({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this.classes
        });
    };

    build() {
        const container = document.createElement("div");

        // Use vertical renderer for search
        const searchConfig = {
            htmlId: this.htmlId + "-search",
            inDataStore: {
                data: [{ search: "" }],
                columns: [{
                    header: "Search",
                    dataKey: "search",
                    options: {
                        button: "Filter"
                    }
                }]
            },
            inTheme: "horizontalLabelAligned",
            onButtonClick: () => {
                const searchInput = searchRow.querySelector("input");
                if (searchInput) {
                    this.refreshTableData(searchInput.value);
                }
            }
        };

        const searchRenderer = new verticalRenderer(searchConfig);
        const searchRow = searchRenderer.buildVerticalFormElement();
        
        // Add event listener to the input element for Enter key
        const searchInput = searchRow.querySelector("input");
        if (searchInput) {
            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    this.refreshTableData(searchInput.value);
                }
            });
        }

        this.tableContainer = document.createElement("div");
        this.tableContainer.appendChild(this.buildTableElements());

        container.appendChild(searchRow);
        container.appendChild(this.tableContainer);

        return this.appendToDom(container);
    };

    refreshTableData(searchValue) {
        // Store original data if not already stored
        if (!this.originalData) {
            this.originalData = [...this.dataStore.data];
        }
        
        // Filter data locally
        if (!searchValue.trim()) {
            this.dataStore.data = [...this.originalData];
        } else {
            const lowerSearch = searchValue.toLowerCase();
            this.dataStore.data = this.originalData.filter(row => {
                return Object.values(row).some(val => 
                    String(val).toLowerCase().includes(lowerSearch)
                );
            });
        }
        
        // Re-render table elements
        this.tableContainer.innerHTML = "";
        this.tableContainer.appendChild(this.buildTableElements());
    }
};

window.ks = window.ks || {};

window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
// Merge any properties previously attached onto tableRenderer
Object.assign(tableRenderer, window.ks.TableBuilder.renderers.tableRenderer || {});

window.ks.TableBuilder.renderers.tableRenderer = tableRenderer;
window.ks.TableBuilder.renderers.tableRenderer.version = "v2.0";

export { tableRenderer };