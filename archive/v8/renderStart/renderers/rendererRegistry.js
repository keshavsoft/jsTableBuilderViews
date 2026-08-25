import { tableRenderer } from "./tableRenderer/v2/index.js";
import { verticalRenderer } from "./verticalRenderer/v8/index.js";
import { cardsRenderer } from "./cardsRenderer/v1/index.js";
import { ulLiRenderer } from "./ulLiRenderer/v1/index.js";
import { navTabsRenderer } from "./navTabsRenderer/v1/index.js";
import { accordionRenderer } from "./accordionRenderer/v1/index.js";
import { gridRenderer } from "./gridRenderer/v1/index.js";
import { carouselRenderer } from "./carouselRenderer/v1/index.js";
import { kanbanRenderer } from "./kanbanRenderer/v1/index.js";
import { timelineRenderer } from "./timelineRenderer/v1/index.js";
import { dlRenderer } from "./dlRenderer/v1/index.js";
import { masonryRenderer } from "./masonryRenderer/v1/index.js";
import { treeRenderer } from "./treeRenderer/v1/index.js";
import { pillsRenderer } from "./pillsRenderer/v1/index.js";

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

export const getAllSampleConfigs = () => {
    return [
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
};
