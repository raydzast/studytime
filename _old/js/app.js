import { render } from "./render/index.js";
import { data } from "../data.js";


export function run() {
    const rootElement = document.getElementById("root");
    render(data, rootElement);
}
