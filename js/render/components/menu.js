import { getCellCssClass } from "../utils.js";


export class Menu {
    constructor(data) {
        this.data = data;
        this.stats = this.calcStats(this.data["headers"].length - 1);
    }

    calcStats(entriesOffset) {
        const stats = {};

        this.data["rows"].forEach(row => {
            row.slice(entriesOffset).forEach(entry => {
                const cssClass = getCellCssClass(entry) || "white-bg";
                stats[cssClass] = (stats[cssClass] || 0) + 1;
            })
        });

        return stats;
    }

    render(data, menuElement = document.createElement("div")) {
        menuElement.setAttribute("id", "menu");

        menuElement.appendChild(this.renderDate());
        menuElement.appendChild(this.renderStats(data));

        return menuElement;
    }

    renderStats() {
        const statsElement = document.createElement("div");
        statsElement.setAttribute("class", "black-bg");

        const colorMapping = {
            "white-bg": "#ffffff",
            "green-bg": "#34a853",
            "orange-bg": "#ff6d01",
            "red-bg": "#ea4335"
        };

        const stats = this.stats;

        let first = true;
        for (const cssClass in colorMapping) {
            if (first === false) {
                statsElement.appendChild(document.createTextNode("/"));
            } else {
                first = false;
            }

            const item = document.createElement("span");
            item.innerText = stats[cssClass] || 0;
            item.setAttribute("style", `color: ${colorMapping[cssClass]}`);
            statsElement.appendChild(item);
        }

        return statsElement;
    }

    renderDate() {
        const dateElement = document.createElement("div");

        dateElement.setAttribute("class", "darkgray-bg");
        dateElement.innerText = new Date(new Date().valueOf() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 10);

        return dateElement;
    }
};
