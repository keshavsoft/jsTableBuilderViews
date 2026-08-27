const extractLineData = ({ inEvent }) => {
    const localEvent = inEvent;
    const lineData = {};

    if (localEvent && localEvent.currentTarget) {
        // Traverse to the specific field (line) instead of the whole form
        const fieldContainer = localEvent.currentTarget.closest(".ks-vertical-form-field");
        if (fieldContainer) {
            const inputs = fieldContainer.querySelectorAll("input, select, textarea, ks-table-cell-content-common-v5");
            inputs.forEach(input => {
                const key = input.name || input.id;
                if (key) {
                    lineData[key] = input.type === "checkbox" ? input.checked : input.value;
                }
            });
        }
    }

    return lineData;
};

export { extractLineData };
