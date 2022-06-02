import { getCellContent, getCellCssClass } from "../utils.js";


export class Table {
    constructor(data) {
        this.converter = new showdown.Converter();
        this.data = data;
        this.maxColumns = Math.max(
            data["headers"].length,
            ...data["rows"].map(row => row.length)
        );
    }

    render(tableElement = document.createElement("table")) {
        tableElement.appendChild(this.renderThead());
        tableElement.appendChild(this.renderTbody());

        return tableElement;
    }

    renderThead() {
        const theadElement = document.createElement("thead");
        const trElement = this.renderTr(this.data["headers"], "th");

        theadElement.appendChild(trElement);
        return theadElement;
    }

    renderTbody() {
        const tbodyElement = document.createElement("tbody");

        for (const row of this.data["rows"]) {
            tbodyElement.appendChild(this.renderTr(row));
        }

        return tbodyElement;
    }

    renderTr(items, cellTag = "td") {
        const trElement = document.createElement("tr");

        for (const contents of items) {
            trElement.appendChild(this.createElement(contents, cellTag));
        }
        for (let i = items.length; i < this.maxColumns; i++) {
            trElement.appendChild(this.createElement("", cellTag));
        }

        return trElement;
    }

    createElement(obj, tag) {
        const element = document.createElement(tag);
        element.innerHTML = this.converter.makeHtml(getCellContent(obj));
        element.setAttribute("class", getCellCssClass(obj));

        for (const a of element.getElementsByTagName("a")) {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noreferrer noopener");
        }

        return element;
    }
}
