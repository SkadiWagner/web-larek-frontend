export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
    events: {
        productsChanged: "products:changed",
        cardSelected: "products:selected",
        selectedProductChanged: 'selectedProduct:changed',
        modalOpen: "modal:open",
        modalClose: "modal:close",
        cartChanged: "cart:changed",
        cartOpen: "cart:open",
        orderStarted: "order:started",
        orderDeliveryDataChanged: "orderDeliveryData:changed",
        orderAddressSubmitted: "order:addressSubmitted",
        orderContactsSubmitted: "order:contactsSubmitted",
        orderFinished: "order:finished",
    }
};
export const paymentMethods = {
    online: 'card',
    offline: 'cash'
}