import { RENDERER_MAP } from "../../renderers/rendererRegistry.js";
import { DOMManager } from "./DOMManager.js";
import { refreshDataViews } from "./RefreshManager.js";

export const renderSpecificView = async (instance, config) => {
    // If no rendererType is provided, default to table (or vertical based on old logic)
    const rendererType = config.rendererType || "vertical";
    const htmlId = instance.htmlId || "table-root";
    const theme = config?.theme;

    const rootElement = document.getElementById(htmlId);
    if (!rootElement) return;

    const RendererClass = RENDERER_MAP[rendererType];
    if (!RendererClass) return;

    const renderer = new RendererClass({
        htmlId,
        inDataStore: instance.dataStore,
        inTheme: theme,
        onButtonClick: (data) => {
            console.log("TableBuilder received button click:", data);
            const btnText = data.buttonText ? data.buttonText.toLowerCase() : "";
            if (btnText === "filter" || btnText === "submit") {
                instance.filterData(data.lineData);
                // Call the RefreshManager (Stage Hand) to perform a partial update
                refreshDataViews(instance);
            }
        }
    });

    // Delegate to the Crew to mount it on stage
    await DOMManager.mountView(htmlId, renderer, instance, rendererType);
};

export const renderAllViews = async (instance) => {
    // Stage Crew clears the stage
    DOMManager.clearStage(instance.htmlId);
    instance.viewNodes = [];

    // Stage Manager cues the actors
    for (const config of instance.views) {
        await renderSpecificView(instance, config);
    };
};
