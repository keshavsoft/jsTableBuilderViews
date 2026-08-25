import runV7 from "./v7/index.js";

// Export the version object so consumers can explicitly select a version if needed
export const v7 = { renderInputControl: runV7 };

// Default export uses v7
export const renderInputControl = runV7;
