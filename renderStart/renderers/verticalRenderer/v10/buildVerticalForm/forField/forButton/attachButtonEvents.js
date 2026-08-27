const attachButtonEvents = ({ inButton, inResolvedOptions, inCol, inOnButtonClick }) => {
    const localButton = inButton;
    const localResolvedOptions = inResolvedOptions;
    const localCol = inCol;
    const localOnButtonClick = inOnButtonClick;

    localButton.addEventListener("click", (e) => {
        if (typeof localResolvedOptions.onClick === "function") {
            localResolvedOptions.onClick(e, { column: localCol });
        }

        if (typeof localOnButtonClick === "function") {
            localOnButtonClick({ column: localCol, buttonText: localResolvedOptions.text, event: e });
        }
    });
};

export { attachButtonEvents };
