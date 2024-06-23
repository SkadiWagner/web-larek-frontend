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
        orderPublished: "order:published",
        orderFinished: "order:finished",

        addressErrorsChanged: "orderAddress:errorsChanged",
        addressDataChanged: "orderAddress:changed",
        addressFormSubmitted: "order:addressSubmitted",

        contactsErrorsChanged: "orderContacts:errorsChanged",
        contactsDataChanged: "orderContacts:dataChanged",
        contactsFormSubmitted: "order:contactsSubmitted",

        removeProduct: "remove:product"
    }
};
export const paymentMethods = {
    online: 'card',
    offline: 'cash'
}