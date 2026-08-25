export const DEFAULT_CLASSES = {
    standardGrid: {
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
    standardGridCompact: {
        container: "w-full overflow-x-auto",
        emptyState: "p-3 text-gray-500 italic",
        table: "w-full border border-gray-200 divide-y divide-gray-200 table-fixed",
        head: {
            wrapper: "bg-gray-100 sticky top-0 z-10",
            row: "divide-x divide-gray-200",
            cell: "px-3 py-2 text-left text-[11px] font-semibold text-gray-600 uppercase tracking-wider border-b"
        },
        body: {
            wrapper: "bg-white divide-y divide-gray-200",
            row: "hover:bg-gray-50 transition-colors divide-x divide-gray-200",
            cell: "px-3 py-2 whitespace-nowrap text-xs text-gray-700",
            cellTruncate: "truncate max-w-xs"
        },
        topHeader: {
            wrapper: "flex justify-between items-center p-3 bg-white border-b border-gray-200 rounded-t-lg mb-3",
            label: "text-base font-semibold text-gray-800",
            input: "px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs w-56 transition-all"
        }
    },
    standardGridExtraCompact: {
        container: "w-full overflow-x-auto",
        emptyState: "p-2 text-gray-500 italic",
        table: "w-full border border-gray-200 divide-y divide-gray-200 table-fixed",
        head: {
            wrapper: "bg-gray-100 sticky top-0 z-10",
            row: "divide-x divide-gray-200",
            cell: "px-2 py-1.5 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider border-b"
        },
        body: {
            wrapper: "bg-white divide-y divide-gray-200",
            row: "hover:bg-gray-50 transition-colors divide-x divide-gray-200",
            cell: "px-2 py-1.5 whitespace-nowrap text-[11px] text-gray-700",
            cellTruncate: "truncate max-w-xs"
        },
        topHeader: {
            wrapper: "flex justify-between items-center p-2 bg-white border-b border-gray-200 rounded-t-lg mb-2",
            label: "text-sm font-semibold text-gray-800",
            input: "px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-[11px] w-48 transition-all"
        }
    },
    compactMinimal: {
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
    standardMinimal: {
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
    spaciousMinimal: {
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
