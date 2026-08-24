const isRenderable = ({ inCol }) => {
    return Boolean(inCol?.dataKey || inCol?.options?.verticalForm?.elements || inCol?.options?.elements);
};

export { isRenderable };
