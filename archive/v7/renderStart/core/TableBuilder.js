import tableBuilderDescription from "./TableBuilderDescription.json" with { type: "json" };
import tableBuilderSampleConfig from "./TableBuilderSampleConfig.json" with { type: "json" };

import { setupColumnsAndData } from "../dataFuncs/setupDataStore.js";
import { tableRenderer } from "../renderers/tableRenderer/v2/index.js";
import { verticalRenderer } from "../renderers/verticalRenderer/v8/index.js";
import { cardsRenderer } from "../renderers/cardsRenderer/v1/index.js";
import { ulLiRenderer } from "../renderers/ulLiRenderer/v1/index.js";
import { navTabsRenderer } from "../renderers/navTabsRenderer/v1/index.js";
import { accordionRenderer } from "../renderers/accordionRenderer/v1/index.js";
import { gridRenderer } from "../renderers/gridRenderer/v1/index.js";
import { carouselRenderer } from "../renderers/carouselRenderer/v1/index.js";
import { kanbanRenderer } from "../renderers/kanbanRenderer/v1/index.js";
import { timelineRenderer } from "../renderers/timelineRenderer/v1/index.js";
import { dlRenderer } from "../renderers/dlRenderer/v1/index.js";
import { masonryRenderer } from "../renderers/masonryRenderer/v1/index.js";
import { treeRenderer } from "../renderers/treeRenderer/v1/index.js";
import { pillsRenderer } from "../renderers/pillsRenderer/v1/index.js";
import { filterData } from "./methods/filterData.js";
import { refreshTables, appendToDom } from "./methods/refreshTables.js";

export const RENDERER_MAP = {
    vertical: verticalRenderer,
    table: tableRenderer,
    cards: cardsRenderer,
    ulLi: ulLiRenderer,
    navTabs: navTabsRenderer,
    accordion: accordionRenderer,
    grid: gridRenderer,
    carousel: carouselRenderer,
    kanban: kanbanRenderer,
    timeline: timelineRenderer,
    dl: dlRenderer,
    masonry: masonryRenderer,
    tree: treeRenderer,
    pills: pillsRenderer
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
            tableRenderer.sampleConfig(),
            cardsRenderer.sampleConfig(),
            ulLiRenderer.sampleConfig(),
            navTabsRenderer.sampleConfig(),
            accordionRenderer.sampleConfig(),
            gridRenderer.sampleConfig(),
            carouselRenderer.sampleConfig(),
            kanbanRenderer.sampleConfig(),
            timelineRenderer.sampleConfig(),
            dlRenderer.sampleConfig(),
            masonryRenderer.sampleConfig(),
            treeRenderer.sampleConfig(),
            pillsRenderer.sampleConfig()
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
