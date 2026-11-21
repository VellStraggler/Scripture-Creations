export function isValidShippingConfig(config) {
    return Array.isArray(config?.shippingTiers) &&
        config.shippingTiers.length > 0 &&
        config.shippingTiers.every(tier =>
            tier &&
            (tier.ceiling === null || (Number.isFinite(tier.ceiling) && tier.ceiling >= 0)) &&
            Number.isFinite(tier.base) && tier.base >= 0 &&
            Number.isFinite(tier.perItem) && tier.perItem >= 0
        ) &&
        (config.freeShippingThreshold === null ||
            (config.freeShippingThreshold !== undefined &&
                config.freeShippingThreshold !== "" &&
                Number.isFinite(Number(config.freeShippingThreshold)) &&
                Number(config.freeShippingThreshold) >= 0));
}

export function calculateShipping(cart, config) {
    if (!config) return null;
    if (cart.length === 0) return 0;

    const tier = config.shippingTiers.find(
        tier => tier.ceiling === null || Number(cart[0].price) < tier.ceiling
    );
    if (!tier) return null;

    const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity), 0);
    if (config.freeShippingThreshold !== null && subtotal > config.freeShippingThreshold) return 0;
    return tier.base + Math.max(0, totalItems - 1) * tier.perItem;
}
