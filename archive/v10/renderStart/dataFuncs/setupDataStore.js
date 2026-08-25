import initializeColumns from "./prepareColumns.js";
import prepareData from "./prepareData.js";
import { setupServices } from "../services.js";

const setupColumnsAndData = ({ instance, localColumns, localData, localEndPoints, inMainOptions }) => {
    const dataStore = {};
    const localMainOptions = inMainOptions;

    // console.log("aaaaaaaaaaa : ", localMainOptions, instance);

    dataStore.columns = initializeColumns({
        inColumns: localColumns,
        inShowSerialNo: localMainOptions?.commonOptions?.showSerialNo
    });

    if (localEndPoints) {
        setupServices(instance, localEndPoints);
        // await loadDataFromServices({ instance, localColumns, localData, localEndPoints });

    } else {
        const preparedData = prepareData({
            inData: localData,
            inShowSerialNo: localMainOptions?.commonOptions?.showSerialNo
        });

        dataStore.data = preparedData;
    };

    return dataStore;
};

export { setupColumnsAndData };