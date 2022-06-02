import { Table } from "./components/table.js";
import { Menu } from "./components/menu.js";


export function render(data, root) {
    root.appendChild(new Table(data).render());
    root.appendChild(new Menu(data).render());
}
