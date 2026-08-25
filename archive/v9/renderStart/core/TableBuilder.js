import tableBuilderDescription from "./TableBuilderDescription.json" with { type: "json" };
import tableBuilderSampleConfig from "./TableBuilderSampleConfig.json" with { type: "json" };

import { setupColumnsAndData } from "../dataFuncs/setupDataStore.js";
import { RENDERER_MAP, getAllSampleConfigs } from "../renderers/rendererRegistry.js";
import { filterData } from "./methods/filterData.js";
import { renderAllViews } from "./lifecycle/ViewOrchestrator.js";
import { refreshDataViews } from "./lifecycle/RefreshManager.js";

export { RENDERER_MAP };

export class TableBuilder {
    constructor({
        htmlId,
        data,
        columns = [],
        endPoints,
        views
    }) {
        const localHtmlId = htmlId;
        const localData = data;
        const localColumns = columns;
        const localEndPoints = endPoints;

        this.htmlId = localHtmlId;
        this.originalData = localData;
        this.columns = localColumns;

        this.dataStore = setupColumnsAndData({
            instance: this,
            localColumns,
            localData,
            localEndPoints
        });

        this.views = views;
        this.viewNodes = [];
    };

    static describe() {
        return tableBuilderDescription;
    };

    static sampleConfig() {
        const config = { ...tableBuilderSampleConfig };
        config.views = getAllSampleConfigs();
        return config;
    }

    filterData(filters) {
        return filterData(this, filters);
    }

    async refreshTables() {
        return await refreshDataViews(this);
    }

    async appendToDom() {
        return await renderAllViews(this);
    }

    build() {
        return this.appendToDom();
    };
};
