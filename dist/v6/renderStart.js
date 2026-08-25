var e = {
	name: "TableBuilder",
	version: "v15.0",
	purpose: "Build configured views from shared data and columns.",
	inputs: {
		htmlId: "Target DOM element id.",
		data: "Shared data source. Optional for views that do not require data.",
		columns: "Shared column definition.",
		endPoints: "Optional data access configuration.",
		views: "Array of views to render."
	},
	views: {
		vertical: {
			purpose: "Render the columns as a vertical form.",
			requires: ["columns"],
			dataRequired: !1
		},
		table: {
			purpose: "Render the columns and data as a table.",
			requires: ["columns", "data"],
			dataRequired: !0
		}
	}
}, t = {
	htmlId: "table-root",
	data: [],
	tableName: "sample_table",
	columns: [{
		header: "Sample Column",
		dataKey: "sampleKey",
		options: {
			width: "150px",
			sortable: !0,
			table: {
				isVisible: !0,
				tfoot: {
					summary: {
						summary: "sum",
						summaryLabel1: "Total:"
					},
					inputsRow: {
						showInput: !0,
						controlType: "text"
					}
				}
			},
			verticalForm: { elements: ["label", "input"] }
		}
	}]
}, n = (e) => e != null && e !== "" && (typeof e == "number" || /^\d+$/.test(String(e).trim())) ? `${e}px` : e, r = (e, t) => {
	let n = Array.isArray(e) ? e : [];
	return t && (n = [{
		header: "#",
		dataKey: "$serial",
		options: {
			width: "60px",
			align: "center",
			sortable: !0
		}
	}, ...n]), n;
}, i = ({ inColumns: e, inShowSerialNo: t }) => r(e, t).map((e) => {
	let t = { ...e };
	return t.options && t.options.width && (t.options = {
		...t.options,
		width: n(t.options.width)
	}), t;
}), a = ({ inData: e, inShowSerialNo: t }) => {
	let n = Array.isArray(e) ? e : [e];
	return t && (n = n.map((e, t) => ({
		...e,
		$serial: t + 1
	}))), n;
};
//#endregion
//#region renderStart/services.js
async function o(e, t = {}) {
	try {
		let n = await fetch(e, {
			...t,
			headers: {
				"Content-Type": "application/json",
				...t.headers
			}
		});
		if (!n.ok) throw Error(`HTTP error! status: ${n.status}`);
		return await n.json();
	} catch (t) {
		throw console.error(`Error fetching from ${e}:`, t), t;
	}
}
var s = {
	read: async (e) => {
		if (!e) return null;
		let t = await o(e);
		return Array.isArray(t) ? t : t.tallymessage || t;
	},
	create: async (e, t) => o(e, {
		method: "POST",
		body: JSON.stringify(t)
	}),
	update: async (e, t) => o(e, {
		method: "PUT",
		body: JSON.stringify(t)
	}),
	delete: async (e, t) => o(`${e}/${t}`, { method: "DELETE" })
};
function c(e, t = {}) {
	e.endPoints = t, e.services = {};
	try {
		Object.keys(s).forEach((n) => {
			t[n] && (e.services[n] = (...e) => s[n](t[n], ...e));
		});
	} catch (e) {
		console.log("eeeeeeeee : ", e);
	}
}
//#endregion
//#region renderStart/dataFuncs/setupDataStore.js
var l = ({ instance: e, localColumns: t, localData: n, localEndPoints: r }) => {
	let o = {};
	return o.columns = i({
		inColumns: t,
		inShowSerialNo: e.tableOptions?.inCommonOptions?.inShowSerialNo
	}), r ? c(e, r) : o.data = a({
		inData: n,
		inShowSerialNo: e.tableOptions?.inCommonOptions?.inShowSerialNo
	}), o;
};
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/buildTableElement.js
function u({ inClasses: e = {}, inCommonOptions: t = {} }) {
	let n = e, r = t, i = document.createElement("table");
	return n.table && (i.className = n.table), r.inTableWidth && (i.style.width = r.inTableWidth), r.inTableBorder && (r.inTableBorder.includes(" ") ? i.style.border = r.inTableBorder : i.style.borderWidth = r.inTableBorder), i;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/buildHeaderRowElement.js
function d({ inRowClass: e, inHeaderHeight: t }) {
	let n = document.createElement("tr");
	return e && (n.className = e), t && (n.style.height = t), n;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/KsTableHeaderContent.js
var f = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._inputs = {};
	}
	set inputs(e) {
		this._inputs = e, this.render();
	}
	render() {
		let { header: e, dataKey: t, options: n = {}, sortState: r = [] } = this._inputs, i = e || t || "";
		if (n.sortable) {
			let e = Array.isArray(r) ? r.findIndex((e) => e.dataKey === t) : -1;
			if (e !== -1) {
				let t = r[e].direction === "asc" ? " ↑" : " ↓";
				r.length > 1 && (t += e + 1), i += t;
			}
		}
		this.shadowRoot.textContent = i;
	}
};
customElements.get("ks-table-header-content") || customElements.define("ks-table-header-content", f);
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/HeaderCell.js
var p = {
	width: "",
	align: "",
	vAlign: ""
}, m = ({ inElement: e, inOptions: t = {} }) => {
	let n = e, r = t;
	r.width && (n.style.width = r.width), r.align && (n.style.textAlign = r.align), r.vAlign && (n.style.verticalAlign = r.vAlign);
};
function h({ inHeader: e = "", inDataKey: t = "", inOptions: n = p, inClasses: r = {}, inSortState: i = [], inOnSort: a = () => {} }) {
	let o = e, s = t, c = n, l = r, u = i, d = a, f = document.createElement("th");
	l.cell && (f.className = l.cell), c.sortable && (f.style.cursor = "pointer", f.style.userSelect = "none", f.onclick = (e) => {
		let t = e.shiftKey || e.ctrlKey || e.metaKey;
		d(s, t);
	});
	let h = document.createElement("ks-table-header-content");
	return h.inputs = {
		header: o,
		dataKey: s,
		options: c,
		sortState: u
	}, f.appendChild(h), m({
		inElement: f,
		inOptions: c
	}), f;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/appendHeaderCells.js
function g({ inHeaderRowElement: e, inColumns: t, inClasses: n = {}, inSortState: r = [], inOnSort: i = () => {} }) {
	t.forEach((t) => {
		let a = h({
			inHeader: t.header,
			inDataKey: t.dataKey,
			inOptions: t.options || {},
			inClasses: n,
			inSortState: r,
			inOnSort: i
		});
		e.appendChild(a);
	});
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/appendSpacerCell.js
function _({ inHeaderRowElement: e, inCellClass: t }) {
	let n = document.createElement("th");
	t && (n.className = t), e.appendChild(n);
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/HeaderRow.js
function v({ inColumns: e, inClasses: t = {}, inHeadOptions: n = {}, inSortState: r = [], inOnSort: i = () => {} }) {
	let a = e, o = t, s = n, c = r, l = i, u = d({
		inRowClass: o?.row,
		inHeaderHeight: s?.inHeaderHeight
	});
	return g({
		inHeaderRowElement: u,
		inColumns: a,
		inClasses: o,
		inSortState: c,
		inOnSort: l
	}), _({
		inHeaderRowElement: u,
		inCellClass: o?.cell
	}), u;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/TableHeader.js
function y({ inColumns: e, inClasses: t = {}, inHeadOptions: n = {}, inSortState: r = [], inOnSort: i = () => {} }) {
	let a = e, o = t, s = n, c = r, l = i, u = document.createElement("thead");
	o.wrapper && (u.className = o.wrapper);
	let d = v({
		inColumns: a,
		inClasses: o,
		inHeadOptions: s,
		inSortState: c,
		inOnSort: l
	});
	return u.appendChild(d), u;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forHead/index.js
var b = ({ tableElement: e, inColumns: t, inClasses: n, inHeadOptions: r, inSortState: i, inOnSort: a }) => {
	let o = y({
		inColumns: t,
		inClasses: n.head || {},
		inHeadOptions: r,
		inSortState: i,
		inOnSort: a
	});
	e.appendChild(o);
};
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forBody/v4/buildTableBodyElement.js
function ee({ inWrapperClass: e }) {
	let t = document.createElement("tbody");
	return e && (t.className = e), t;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forBody/v4/TableRow/tableCell/applyCellOptions.js
function te({ inElement: e, inOptions: t = {} }) {
	let n = e, r = t;
	r.width && (n.style.width = r.width), r.align && (n.style.textAlign = r.align), r.vAlign && (n.style.verticalAlign = r.vAlign);
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forBody/v4/TableRow/tableCell/index.js
var ne = {
	width: "",
	align: "",
	vAlign: ""
};
function re({ inCellValue: e, inRowData: t, inOptions: n = ne, inClasses: r = {} }) {
	let i = e, a = t, o = n, s = r, c = document.createElement("td");
	s.cell && (c.className = s.cell), te({
		inElement: c,
		inOptions: o
	}), typeof i == "object" && i && s.cellTruncate && (c.className += (c.className ? " " : "") + s.cellTruncate);
	let l = document.createElement("ks-table-cell-content-common-v5");
	return l.inputs = {
		cellValue: i,
		rowData: a,
		options: o,
		classes: s
	}, c.appendChild(l), c;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forBody/v4/TableRow/1-createTrElement.js
var ie = ({ inClasses: e = {}, inBodyOptions: t = {} }) => {
	let n = e, r = t, i = document.createElement("tr");
	return n.row && (i.className = n.row), r.inRowHeight && (i.style.height = r.inRowHeight), i;
}, ae = ({ inClasses: e = {} }) => {
	let t = e, n = document.createElement("td");
	return t.cell && (n.className = t.cell), n;
}, x = ({ inItem: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) => {
	let i = e, a = t, o = n, s = ie({
		inClasses: o,
		inBodyOptions: r
	});
	a.forEach((e) => {
		let t = i[e.dataKey], n = re({
			inCellValue: t,
			inRowData: i,
			inOptions: e.options || {},
			inClasses: o
		});
		s.appendChild(n);
	});
	let c = ae({ inClasses: o });
	return s.appendChild(c), s;
};
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forBody/v4/appendTableRows.js
function S({ inBodyWrapperElement: e, inData: t, inColumns: n, inClasses: r, inBodyOptions: i }) {
	t.forEach((t) => {
		let a = x({
			inItem: t,
			inColumns: n,
			inClasses: r,
			inBodyOptions: i
		});
		e.appendChild(a);
	});
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forBody/v4/TableBody.js
function C({ inData: e, inColumns: t, inClasses: n = {}, inBodyOptions: r = {} }) {
	let i = e, a = t, o = n, s = r, c = ee({ inWrapperClass: o?.wrapper });
	return S({
		inBodyWrapperElement: c,
		inData: i,
		inColumns: a,
		inClasses: o,
		inBodyOptions: s
	}), c;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/forBody/index.js
var w = C, T = ({ tableElement: e, inData: t, inColumns: n, inClasses: r, inBodyOptions: i }) => {
	let a = w({
		inData: t,
		inColumns: n,
		inClasses: r.body || {},
		inBodyOptions: i
	});
	e.appendChild(a);
};
//#endregion
//#region renderStart/renderers/tableRenderer/v2/buildTable/index.js
function E({ inData: e, inColumns: t, inClasses: n = {}, inTableOptions: r = {}, inSortState: i = [], inOnSort: a = () => {} }) {
	let o = e, s = t, c = n, l = r, d = l.inCommonOptions || {}, f = l.inHeadOptions || {}, p = l.inBodyOptions || {};
	l.inFootOptions;
	let m = i, h = a;
	if (!o || o.length === 0) return buildEmptyState({ inClasses: c });
	console.log("localClasses----- : ", c);
	let g = u({
		inClasses: c,
		inCommonOptions: d
	}), _ = s.filter((e) => e?.options?.table?.isVisible !== !1);
	return b({
		tableElement: g,
		inColumns: _,
		inClasses: c,
		inHeadOptions: f,
		inSortState: m,
		inOnSort: h
	}), T({
		tableElement: g,
		inData: o,
		inColumns: _,
		inClasses: c,
		inBodyOptions: p
	}), g;
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/config/defaults.js
var D = {
	style1: {
		container: "w-full overflow-x-auto",
		emptyState: "p-4 text-gray-500 italic",
		table: "w-full border border-gray-200 divide-y divide-gray-200 table-fixed",
		head: {
			wrapper: "bg-gray-100 sticky top-0 z-10",
			row: "divide-x divide-gray-200",
			cell: "px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
		},
		body: {
			wrapper: "bg-white divide-y divide-gray-200",
			row: "hover:bg-gray-50 transition-colors divide-x divide-gray-200",
			cell: "px-4 py-3 whitespace-nowrap text-sm text-gray-700",
			cellTruncate: "truncate max-w-xs"
		},
		topHeader: {
			wrapper: "flex justify-between items-center p-4 bg-white border-b border-gray-200 rounded-t-lg mb-4",
			label: "text-lg font-semibold text-gray-800",
			input: "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 transition-all"
		}
	},
	style2: {
		container: "w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-x-auto",
		emptyState: "p-4 text-gray-500 italic",
		table: "w-full bg-white",
		head: {
			wrapper: "bg-white sticky top-0 z-10",
			row: "border-b border-gray-200",
			cell: "px-4 py-3 text-left text-sm font-bold text-gray-900 border-b"
		},
		body: {
			wrapper: "bg-white",
			row: "hover:bg-blue-50 transition-colors border-b border-gray-100",
			cell: "px-4 py-3 whitespace-nowrap text-sm text-gray-700",
			cellTruncate: "truncate max-w-xs"
		},
		topHeader: {
			wrapper: "flex justify-between items-center px-4 pb-4 pt-2 bg-white",
			label: "text-lg font-bold text-gray-900",
			input: "px-4 py-1.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm w-64 transition-all shadow-sm text-gray-700"
		}
	},
	style3: {
		container: "w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-x-auto",
		emptyState: "p-4 text-gray-500 italic",
		table: "w-full bg-white",
		head: {
			wrapper: "bg-white sticky top-0 z-10",
			row: "border-b border-gray-200",
			cell: "px-4 py-3.5 text-left text-base font-bold text-gray-900 border-b"
		},
		body: {
			wrapper: "bg-white",
			row: "hover:bg-blue-50 transition-colors border-b border-gray-100",
			cell: "px-4 py-3.5 whitespace-nowrap text-base text-gray-700",
			cellTruncate: "truncate max-w-xs"
		},
		topHeader: {
			wrapper: "flex justify-between items-center px-4 pb-4 pt-2 bg-white",
			label: "text-xl font-bold text-gray-900",
			input: "px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-base w-64 transition-all shadow-sm text-gray-700"
		}
	},
	style4: {
		container: "w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-x-auto",
		emptyState: "p-4 text-gray-500 italic",
		table: "w-full bg-white",
		head: {
			wrapper: "bg-white sticky top-0 z-10",
			row: "border-b border-gray-200",
			cell: "px-5 py-4 text-left text-lg font-bold text-gray-900 border-b"
		},
		body: {
			wrapper: "bg-white",
			row: "hover:bg-blue-50 transition-colors border-b border-gray-100",
			cell: "px-5 py-4 whitespace-nowrap text-lg text-gray-700",
			cellTruncate: "truncate max-w-xs"
		},
		topHeader: {
			wrapper: "flex justify-between items-center px-4 pb-4 pt-2 bg-white",
			label: "text-2xl font-bold text-gray-900",
			input: "px-4 py-2.5 border border-blue-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg w-72 transition-all shadow-sm text-gray-700"
		}
	}
};
//#endregion
//#region renderStart/renderers/tableRenderer/v2/mergeClasses.js
function O({ inClasses: e, inTheme: t = "style1" }) {
	let n = e || {}, r = D[t] || D.style1;
	return {
		...r,
		...n,
		head: {
			...r.head,
			...n.head || {}
		},
		body: {
			...r.body,
			...n.body || {}
		},
		topHeader: {
			...r.topHeader,
			...n.topHeader || {}
		}
	};
}
//#endregion
//#region renderStart/renderers/tableRenderer/v2/index.js
var k = class {
	constructor({ htmlId: e, inDataStore: t, inTheme: n, inClasses: r }) {
		console.log("hhhhhhhh : ", e, t, n, r), this.htmlId = e, this.dataStore = t, this.classes = O({
			inClasses: r,
			inTheme: n
		});
	}
	static sampleConfig() {
		return {
			rendererType: "table",
			htmlId: "table-root",
			theme: "style4"
		};
	}
	appendToDom(e) {
		let t = document.getElementById(this.htmlId);
		if (!t) {
			console.error(`Element with id '${instance.htmlId}' not found.`);
			return;
		}
		t.appendChild(e);
	}
	buildTableElements() {
		return E({
			inData: this.dataStore.data,
			inColumns: this.dataStore.columns,
			inClasses: this.classes
		});
	}
	build() {
		let e = this.buildTableElements();
		return this.appendToDom(e);
	}
};
window.ks = window.ks || {}, window.ks.TableBuilder = window.ks.TableBuilder || {}, window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {}, window.ks.TableBuilder.renderers.tableRenderer = k, window.ks.TableBuilder.renderers.tableRenderer.version = "v2.0";
//#endregion
//#region renderStart/renderers/verticalRenderer/v8/buildVerticalForm/forForm/createContainerElement.js
var A = ({ inClasses: e = {} }) => {
	let t = e?.verticalForm || {
		container: "flex flex-col gap-4 p-4",
		wrapper: "flex flex-col",
		label: "font-bold mb-1",
		input: "border border-gray-300 rounded px-2 py-1 w-full",
		button: "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md",
		inputGroup: "flex flex-row items-center gap-2 w-full"
	}, n = document.createElement("div");
	return t.container && (n.className = t.container), n.classList.add("ks-vertical-form-container"), n;
}, j = ({ inCol: e }) => !!(e?.dataKey || e?.options?.verticalForm?.elements || e?.options?.elements), M = ({ inWrapperClass: e }) => {
	let t = document.createElement("div");
	return e && (t.className = e), t.classList.add("ks-vertical-form-field"), t;
}, N = ({ inCol: e, inFootOptions: t }) => {
	let n = e?.options?.verticalForm?.elements || e?.options?.elements;
	if (Array.isArray(n) && n.length > 0) return n.map((e) => e.toLowerCase().trim());
	let r = [];
	return (e?.options?.verticalForm?.showLabel ?? e?.options?.showLabel ?? !0) && r.push("label"), (e?.options?.verticalForm?.showInput ?? t?.showInput ?? !0) && r.push("input"), (e?.options?.verticalForm?.button || e?.options?.button || t?.button || e?.options?.verticalForm?.showButton || t?.showButton) && r.push("button"), r;
}, P = ({ inGroupClass: e }) => {
	let t = document.createElement("div");
	return e && (t.className = e), t.classList.add("ks-vertical-form-input-group"), t;
}, F = ({ inCol: e, inLabelClass: t }) => {
	let n = e?.options?.verticalForm?.label, r = typeof n == "object" && n ? n : typeof n == "string" ? { text: n } : {}, i = document.createElement("label");
	i.textContent = r.text || r.label || e?.label || e?.header || e?.dataKey || "";
	let a = r.className || t;
	return a && (i.className = a), i.classList.add("ks-vertical-form-label"), r.id && (i.id = r.id), (r.for || r.htmlFor) && (i.htmlFor = r.for || r.htmlFor), i;
}, I = {
	showLogs: !1,
	log: function(...e) {
		this.showLogs && console.log(...e);
	}
}, L = ({ inFootOptions: e = {}, inSummaryValue: t, inListData: n }) => {
	let r = e, i = t;
	I.log("buildCellContent called with", {
		localFootOptions: r,
		localSummaryValue: i,
		inListData: n
	});
	let a = document.createElement("ks-table-cell-content-common-v5");
	return a.style.fontWeight = "bold", a.inputs = i === "" ? {
		cellValue: "",
		options: {
			...r,
			listData: n
		}
	} : {
		cellValue: i,
		options: {
			...r,
			listData: n
		}
	}, a;
}, R = (e, t) => {
	let n = {};
	return e.forEach((e) => {
		let r = e[t];
		r != null && r !== "" && (n[r] = (n[r] || 0) + 1);
	}), Object.entries(n).map(([e, t]) => ({
		value: e,
		text: `${e} : ${t}`
	})).sort((e, t) => e.value.localeCompare(t.value));
}, z = ({ inData: e = [], inCol: t }) => {
	let n = t?.options?.table?.tfoot?.inputsRow;
	return n?.controlType === "datalist" || n?.controlType === "select" ? R(e, t?.dataKey) : [];
}, B = ({ inCol: e, inFootOptions: t, inDefaultInputClass: n }) => {
	let r = e?.options?.verticalForm?.input || e?.options?.input || {}, i = t ? { ...t } : {
		showInput: !0,
		controlType: "text",
		className: n
	}, a = {
		dataKey: e?.dataKey,
		...i,
		...r
	};
	return a.className ||= n, a;
}, V = ({ inData: e = [], inCol: t, inFormClasses: n = {} }) => {
	let r = t?.options?.table?.tfoot?.inputsRow;
	return L({
		inFootOptions: B({
			inCol: t,
			inFootOptions: r,
			inDefaultInputClass: n.input
		}),
		inSummaryValue: "",
		inListData: z({
			inData: e,
			inCol: t
		})
	});
}, H = ({ inCol: e, inButtonClass: t, onButtonClick: n }) => {
	let r = e?.options?.verticalForm?.button ?? e?.options?.button ?? e?.options?.table?.tfoot?.inputsRow?.button, i = typeof r == "object" && r ? r : typeof r == "string" ? { text: r } : {}, a = document.createElement("button"), o = i.text || i.label || e?.options?.buttonText || "Submit";
	a.textContent = o, a.type = i.type || "button";
	let s = i.className || t;
	return s && (a.className = s), a.classList.add("ks-vertical-form-button"), i.id && (a.id = i.id), i.name && (a.name = i.name), i.title && (a.title = i.title), a.addEventListener("click", (t) => {
		typeof i.onClick == "function" && i.onClick(t, { column: e }), typeof n == "function" && n({
			column: e,
			buttonText: o,
			event: t
		});
	}), a;
}, U = ({ type: e, inData: t, inCol: n, inFormClasses: r, onButtonClick: i }) => {
	switch (e) {
		case "label": return F({
			inCol: n,
			inLabelClass: r.label
		});
		case "input": return V({
			inData: t,
			inCol: n,
			inFormClasses: r
		});
		case "button": return H({
			inCol: n,
			inButtonClass: r.button,
			onButtonClick: i
		});
		default: return null;
	}
}, W = ({ inData: e = [], inCol: t, inFormClasses: n = {}, elementTypes: r = [], wrapper: i, onButtonClick: a }) => {
	let o = r.includes("input"), s = r.includes("button"), c = o && s && t?.options?.verticalForm?.groupInputButton !== !1 ? P({ inGroupClass: n.inputGroup }) : null;
	r.forEach((r) => {
		let o = U({
			type: r,
			inData: e,
			inCol: t,
			inFormClasses: n,
			onButtonClick: a
		});
		o && (c && (r === "input" || r === "button") ? c.appendChild(o) : i.appendChild(o));
	}), c && i.appendChild(c);
}, oe = ({ inData: e = [], inCol: t, inClasses: n = {}, onButtonClick: r }) => {
	if (!j({ inCol: t })) return null;
	let i = n?.verticalForm || {}, a = t?.options?.table?.tfoot?.inputsRow, o = M({ inWrapperClass: i.wrapper });
	return W({
		inData: e,
		inCol: t,
		inFormClasses: i,
		elementTypes: N({
			inCol: t,
			inFootOptions: a
		}),
		wrapper: o,
		onButtonClick: r
	}), o;
}, G = ({ inData: e = [], inColumns: t = [], inClasses: n = {}, onButtonClick: r }) => {
	let i = A({ inClasses: n }), a = (e) => {
		let t = {}, { event: n } = e;
		if (n && n.currentTarget) {
			let e = n.currentTarget.closest(".ks-vertical-form-field");
			e && e.querySelectorAll("input, select, textarea, ks-table-cell-content-common-v5").forEach((e) => {
				let n = e.name || e.id;
				n && (t[n] = e.type === "checkbox" ? e.checked : e.value);
			});
		}
		typeof r == "function" && r({
			...e,
			lineData: t,
			domContent: i
		});
	};
	return t.forEach((t) => {
		let r = oe({
			inData: e,
			inCol: t,
			inClasses: n,
			onButtonClick: a
		});
		r && i.appendChild(r);
	}), i;
}, K = {
	style1: {
		container: "w-full overflow-x-auto",
		verticalForm: {
			container: "flex flex-col gap-4 p-4 max-w-2xl bg-white border border-gray-200 rounded-lg shadow-sm mx-auto",
			wrapper: "flex flex-col",
			label: "font-bold mb-1 text-gray-700",
			input: "border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
			button: "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition duration-150 shadow-sm cursor-pointer",
			inputGroup: "flex flex-row items-center gap-2 w-full"
		}
	},
	style2: {
		container: "w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-x-auto",
		verticalForm: {
			container: "flex flex-col gap-6 p-6 max-w-3xl bg-gray-50 border border-gray-300 rounded-xl mx-auto shadow",
			wrapper: "flex flex-row items-center",
			label: "font-semibold w-1/3 text-right pr-4 text-gray-800",
			input: "border border-blue-400 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm",
			button: "bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-150 cursor-pointer whitespace-nowrap",
			inputGroup: "flex flex-row items-center gap-2 w-2/3"
		}
	},
	style3: { verticalForm: {
		container: "flex flex-col gap-4 p-5 max-w-md bg-white border-t-4 border-blue-500 rounded shadow-md mx-auto",
		wrapper: "flex flex-col",
		label: "hidden",
		input: "border-b-2 border-gray-300 px-2 py-3 w-full focus:outline-none focus:border-blue-500 bg-gray-50",
		button: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded shadow cursor-pointer whitespace-nowrap",
		inputGroup: "flex flex-row items-center gap-2 w-full"
	} },
	style4: { verticalForm: {
		container: "flex flex-col gap-8 p-8 max-w-4xl bg-white border-2 border-gray-800 rounded-2xl mx-auto",
		wrapper: "flex flex-col",
		label: "font-extrabold mb-3 text-xl tracking-wide text-gray-900",
		input: "border-2 border-gray-400 rounded-xl px-5 py-4 w-full text-2xl focus:outline-none focus:border-black font-medium",
		button: "bg-black hover:bg-gray-800 text-white font-bold px-6 py-4 rounded-xl text-xl transition cursor-pointer whitespace-nowrap",
		inputGroup: "flex flex-row items-center gap-3 w-full"
	} }
};
//#endregion
//#region renderStart/renderers/verticalRenderer/v8/mergeClasses.js
function q({ inClasses: e, inTheme: t = "style1" } = {}) {
	let n = e || {}, r = K[t] || K.style1;
	return {
		...r,
		...n,
		verticalForm: {
			...r.verticalForm,
			...n.verticalForm || {}
		},
		head: {
			...r.head,
			...n.head || {}
		},
		body: {
			...r.body,
			...n.body || {}
		},
		topHeader: {
			...r.topHeader,
			...n.topHeader || {}
		}
	};
}
//#endregion
//#region renderStart/renderers/verticalRenderer/v8/index.js
var se = { verticalForm: {
	show: !0,
	label: "Default Vertical Form",
	style: "default"
} }, J = class {
	static DEFAULTS = se;
	constructor({ htmlId: e, inDataStore: t, inClasses: n, inTheme: r = "style1", onButtonClick: i }) {
		this.htmlId = e, this.dataStore = t, this.classes = q({
			inClasses: n,
			inTheme: r
		}), this.onButtonClick = i;
	}
	static sampleConfig() {
		return {
			rendererType: "vertical",
			htmlId: "table-root",
			theme: "style2"
		};
	}
	appendToDom(e) {
		let t = document.getElementById(this.htmlId);
		if (!t) {
			console.error(`Element with id '${this.htmlId}' not found.`);
			return;
		}
		t.appendChild(e);
	}
	buildVerticalFormElement() {
		return G({
			inData: this.dataStore.data,
			inColumns: this.dataStore.columns,
			inClasses: this?.classes,
			onButtonClick: this.onButtonClick
		});
	}
	build() {
		let e = this.buildVerticalFormElement();
		return this.appendToDom(e);
	}
};
window.ks = window.ks || {}, window.ks.TableBuilder = window.ks.TableBuilder || {}, window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {}, window.ks.TableBuilder.renderers.verticalRenderer = J, window.ks.TableBuilder.renderers.verticalRenderer.version = "v5.0";
//#endregion
//#region renderStart/core/methods/filterData.js
var ce = (e, t) => {
	if (!t || Object.keys(t).length === 0) return;
	let n = [...e.originalData];
	for (let [e, r] of Object.entries(t)) r !== void 0 && r !== "" && (n = n.filter((t) => t[e] == r));
	e.dataStore = l({
		instance: e,
		localColumns: e.columns,
		localData: n,
		localEndPoints: e.options?.endPoints
	});
}, le = async (e) => {
	if (document.getElementById(e.htmlId || "table-root")) {
		e.viewNodes.forEach((e) => {
			e.type === "table" && e.node && e.node.parentNode && e.node.parentNode.removeChild(e.node);
		}), e.viewNodes = e.viewNodes.filter((e) => e.type !== "table");
		for (let t of e.views) t.rendererType === "table" && await Y(e, t);
	}
}, Y = async (e, t) => {
	let n = t.rendererType || "vertical", r = e.htmlId || "table-root", i = t?.theme, a = document.getElementById(r);
	if (!a) return;
	let o = de[n];
	if (!o) return;
	let s = new o({
		htmlId: r,
		inDataStore: e.dataStore,
		inTheme: i,
		onButtonClick: (t) => {
			console.log("TableBuilder received from vertical button click:", t);
			let n = t.buttonText ? t.buttonText.toLowerCase() : "";
			(n === "filter" || n === "submit") && (e.filterData(t.lineData), e.refreshTables());
		}
	}), c = a.appendChild.bind(a), l = null;
	a.appendChild = (e) => (l = e, c(e)), await s.build(), a.appendChild = c, l && e.viewNodes.push({
		type: n,
		node: l
	});
}, ue = async (e) => {
	let t = document.getElementById(e.htmlId || "table-root");
	t && (t.innerHTML = "", e.viewNodes = []);
	for (let t of e.views) await Y(e, t);
}, de = {
	vertical: J,
	table: k
}, X = class {
	constructor({ htmlId: e, data: t, columns: n = [], endPoints: r, views: i }) {
		let a = e, o = t, s = n, c = r;
		this.htmlId = a, this.originalData = o, this.columns = s, this.dataStore = l({
			instance: this,
			localColumns: s,
			localData: o,
			localEndPoints: c
		}), this.views = i, this.viewNodes = [];
	}
	static describe() {
		return e;
	}
	static sampleConfig() {
		let e = { ...t };
		return e.views = [J.sampleConfig(), k.sampleConfig()], e;
	}
	filterData(e) {
		return ce(this, e);
	}
	async refreshTables() {
		return await le(this);
	}
	async appendToDom() {
		return await ue(this);
	}
	build() {
		return this.appendToDom();
	}
};
//#endregion
//#region webComponents/v5/cellRenderers/renderArrayView.js
function fe(e, t) {
	let n = document.createElement("button");
	n.textContent = `View (${t.length})`, n.style.cssText = "padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background-color: #f3f4f6; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer;", n.onmouseover = () => n.style.backgroundColor = "#e5e7eb", n.onmouseout = () => n.style.backgroundColor = "#f3f4f6", e.appendChild(n);
}
//#endregion
//#region webComponents/v5/cellRenderers/renderDefault.js
function pe(e, t) {
	typeof t == "object" && t && (t = JSON.stringify(t)), t ??= "", e.textContent = t;
}
//#endregion
//#region webComponents/v5/cellRenderers/renderInputControl/v7/1-createInputElement/typeLayer.js
var me = [
	"text",
	"password",
	"email",
	"number",
	"tel",
	"url",
	"search",
	"date",
	"time",
	"datetime-local",
	"month",
	"week",
	"color",
	"range",
	"checkbox",
	"radio",
	"file",
	"hidden",
	"submit",
	"reset",
	"button",
	"image"
], Z = (e, t) => {
	let n = (t.controlType || "text").toLowerCase();
	e.type = me.includes(n) ? n : "text";
}, Q = (e, t) => {
	t.placeholder && (e.placeholder = t.placeholder), t.value !== void 0 && (e.value = t.value), t.name && (e.name = t.name), t.id && (e.id = t.id);
}, he = (e, t) => {
	t.min !== void 0 && (e.min = t.min), t.max !== void 0 && (e.max = t.max), t.step !== void 0 && (e.step = t.step), t.maxLength !== void 0 && (e.maxLength = t.maxLength), t.pattern && (e.pattern = t.pattern);
}, ge = (e, t) => {
	t.required && (e.required = !0), t.disabled && (e.disabled = !0), t.readOnly && (e.readOnly = !0), t.checked && (e.checked = !0), t.multiple && (e.multiple = !0);
}, _e = (e) => {
	let t = e, n = document.createElement("input"), r = document.createElement("datalist"), i = "datalist-" + Math.random().toString(36).substr(2, 9);
	return n.setAttribute("list", i), r.id = i, t.listData && Array.isArray(t.listData) && t.listData.forEach((e) => {
		let t = document.createElement("option");
		typeof e == "object" && e ? (t.value = e.value, t.label = e.text, t.textContent = e.text) : t.value = e, r.appendChild(t);
	}), Z(n, t), n.__dataListElement = r, n;
}, ve = (e) => {
	let t = e, n = document.createElement("select");
	return t.listData && Array.isArray(t.listData) && t.listData.forEach((e) => {
		let t = document.createElement("option");
		typeof e == "object" && e ? (t.value = e.value, t.textContent = e.text) : (t.value = e, t.textContent = e), n.appendChild(t);
	}), n;
}, ye = {
	showLogs: !1,
	log: function(...e) {
		this.showLogs && console.log(...e);
	}
}, be = (e) => {
	let t = e;
	ye.log(t, "----------");
	let n;
	return t.controlType === "datalist" ? n = _e(t) : t.controlType === "select" ? n = ve(t) : (n = document.createElement("input"), Z(n, t)), Q(n, t), he(n, t), ge(n, t), n;
}, $ = {
	default: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);",
	minimal: "width: 100%; max-width: 12rem; box-sizing: border-box; border: none; border-bottom: 2px solid #d1d5db; border-radius: 0; padding: 0.375rem 0.5rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: transparent;",
	pill: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 9999px; padding: 0.375rem 1rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);",
	danger: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #ef4444; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #b91c1c; background-color: #fef2f2; box-shadow: 0 1px 2px 0 rgba(239, 68, 68, 0.1);"
}, xe = (e, t) => {
	let n = t.theme && $[t.theme] ? t.theme : "default";
	e.style.cssText = $[n], t.className && (e.className = t.className);
}, Se = (e) => {
	e.addEventListener("focus", () => {
		e.style.borderColor = "#3b82f6", e.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.3)";
	}), e.addEventListener("blur", () => {
		e.style.borderColor = "#d1d5db", e.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
	});
}, Ce = (e, t = null) => {
	let n = t || {
		controlType: "text",
		placeholder: "Enter value..."
	}, r = be(n);
	xe(r, n), Se(r), e.appendChild(r), r.__dataListElement && e.appendChild(r.__dataListElement);
}, we = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }), this._inputs = {};
	}
	set inputs(e) {
		this._inputs = e, this.render();
	}
	render() {
		let e = this._inputs.cellValue;
		this._inputs.rowData;
		let t = this._inputs.options || {};
		if (this.shadowRoot.innerHTML = "", t.dataKey || t.name) {
			let e = t.name || t.dataKey;
			this.setAttribute("name", e), this.name = e;
		}
		if (t.id && (this.setAttribute("id", t.id), this.id = t.id), t.table?.tbody?.td, t?.showInput) {
			Ce(this.shadowRoot, t);
			return;
		}
		if (Array.isArray(e)) {
			fe(this.shadowRoot, e);
			return;
		}
		pe(this.shadowRoot, e);
	}
	get value() {
		let e = this.shadowRoot.querySelector("input, select, textarea");
		if (e) return e.type === "checkbox" ? e.checked : e.value;
	}
};
customElements.get("ks-table-cell-content-common-v5") || customElements.define("ks-table-cell-content-common-v5", we), window.ks = window.ks || {}, Object.assign(X, window.ks.TableBuilder || {}), window.ks.TableBuilder = X, window.ks.TableBuilder.version = "v15.0";
//#endregion
export { X as TableBuilder };
