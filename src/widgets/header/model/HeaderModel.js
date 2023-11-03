export default class HeaderModel {
    static selector = "[data-js-header]";

    static instance = null;

    constructor() {
        if (HeaderModel.instance) return HeaderModel.instance;

        this.node = document.querySelector(HeaderModel.selector);
        // eslint-disable-next-line no-console
        console.log(this.node);
        HeaderModel.instance = this;
    }
}
