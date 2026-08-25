import { DEFAULT_CLASSES } from "../../../style/v2/verticalClasses.js";

export function mergeClasses({ inClasses, inTheme = "standardVertical" } = {}) {
    const localClasses = inClasses || {};
    const defaultThemeClasses = DEFAULT_CLASSES[inTheme] || DEFAULT_CLASSES.standardVertical;

    return {
        ...defaultThemeClasses,
        ...localClasses,
        verticalForm: {
            ...defaultThemeClasses.verticalForm,
            ...(localClasses.verticalForm || {})
        },
        head: { ...defaultThemeClasses.head, ...(localClasses.head || {}) },
        body: { ...defaultThemeClasses.body, ...(localClasses.body || {}) },
        topHeader: { ...defaultThemeClasses.topHeader, ...(localClasses.topHeader || {}) }
    };
}
