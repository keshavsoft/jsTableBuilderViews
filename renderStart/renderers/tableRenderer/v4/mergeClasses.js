// import { DEFAULT_CLASSES } from "./config/defaults.js";
import { DEFAULT_CLASSES } from "../../../style/v2/tableClasses.js";

export function mergeClasses({ inClasses, inTheme = "standardGrid" }) {
    const localClasses = inClasses || {};
    const defaultThemeClasses = DEFAULT_CLASSES[inTheme] || DEFAULT_CLASSES.standardGrid;

    return {
        ...defaultThemeClasses,
        ...localClasses,
        head: { ...defaultThemeClasses.head, ...(localClasses.head || {}) },
        body: { ...defaultThemeClasses.body, ...(localClasses.body || {}) },
        topHeader: { ...defaultThemeClasses.topHeader, ...(localClasses.topHeader || {}) }
    };
}
