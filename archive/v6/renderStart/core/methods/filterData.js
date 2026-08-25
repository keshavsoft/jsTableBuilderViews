import { setupColumnsAndData } from "../../dataFuncs/setupDataStore.js";

export const filterData = (instance, filters) => {
    if (!filters || Object.keys(filters).length === 0) return;

    let filteredData = [...instance.originalData];

    for (const [key, value] of Object.entries(filters)) {
        if (value === undefined || value === "") continue;
        
        filteredData = filteredData.filter(item => {
            return item[key] == value;
        });
    }

    instance.dataStore = setupColumnsAndData({
        instance: instance,
        localColumns: instance.columns,
        localData: filteredData,
        localEndPoints: instance.options?.endPoints
    });
};
