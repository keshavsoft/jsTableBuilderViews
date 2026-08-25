import tableBuilderDescription from "./TableBuilderDescription.json" with { type: "json" };
import tableBuilderSampleConfig from "./TableBuilderSampleConfig.json" with { type: "json" };

import { setupColumnsAndData } from "../dataFuncs/setupDataStore.js";
import { tableRenderer } from "../renderers/tableRenderer/v2/index.js";
import { verticalRenderer } from "../renderers/verticalRenderer/v8/index.js";
import { filterData } from "./methods/filterData.js";
import { refreshTables, appendToDom } from "./methods/refreshTables.js";

export const RENDERER_MAP = {
    vertical: verticalRenderer,
    table: tableRenderer
};

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
        config.views = [
            verticalRenderer.sampleConfig(),
            tableRenderer.sampleConfig()
        ];
        return config;
    }

    filterData(filters) {
        return filterData(this, filters);
    }

    async refreshTables() {
        return await refreshTables(this);
    }

    async appendToDom() {
        return await appendToDom(this);
    }

    build() {
        return this.appendToDom();
    };
};
