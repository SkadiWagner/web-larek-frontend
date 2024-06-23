export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
    events: {
        productsChanged: "products:changed",
        cardSelected: "products:selected",
        selectedProductChanged: 'selectedProduct:changed',
        modalOpen: "modal:open",
        modalClose: "modal:close",
        addedToCart: "selectedProduct:addedToCard",
        cartOpen: "cart:open",
    }
};
