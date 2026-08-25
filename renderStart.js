import { TableBuilder } from "./renderStart/core/TableBuilder.js";
// import "./webComponents/v7/KsTableCellContent.js";

window.ks = window.ks || {};

// Merge any properties previously attached (like renderers) onto TableBuilder
Object.assign(TableBuilder, window.ks.TableBuilder || {});

window.ks.TableBuilder = TableBuilder;
window.ks.TableBuilder.version = "v15.0";

export { TableBuilder };