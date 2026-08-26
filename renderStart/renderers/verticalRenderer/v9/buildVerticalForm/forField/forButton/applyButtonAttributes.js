const applyButtonAttributes = ({ inButton, inResolvedOptions }) => {
    const localButton = inButton;
    const localResolvedOptions = inResolvedOptions;

    localButton.textContent = localResolvedOptions.text;
    localButton.type = localResolvedOptions.type;

    if (localResolvedOptions.customClass) {
        localButton.className = localResolvedOptions.customClass;
    }
    localButton.classList.add("ks-vertical-form-button");

    if (localResolvedOptions.id) localButton.id = localResolvedOptions.id;
    if (localResolvedOptions.name) localButton.name = localResolvedOptions.name;
    if (localResolvedOptions.title) localButton.title = localResolvedOptions.title;
};

export { applyButtonAttributes };
