import { DOMManager } from "./DOMManager.js";
import { renderSpecificView } from "./ViewOrchestrator.js";

export const refreshDataViews = async (instance) => {
    const rootElement = document.getElementById(instance.htmlId || "table-root");
    if (!rootElement) return;

    // 1. Stage Hand asks Crew to remove any actor that isn't the 'vertical' form
    // (This preserves the form inputs/state while refreshing all data visualizations)
    const viewsToRefresh = instance.views.filter(config => config.rendererType !== "vertical");

    viewsToRefresh.forEach(config => {
        DOMManager.removeSpecificActors(instance, config.rendererType);
    });

    // 2. Stage Hand asks Stage Manager to re-render those specific views with updated data
    for (const config of viewsToRefresh) {
        await renderSpecificView(instance, config);
    }
};
