export function getCellCssClass(obj) {
    if (typeof obj === "string" || obj instanceof String) {
        return "";
    } else {
        return obj[1];
    }
}

export function getCellContent(obj) {
    if (typeof obj === "string" || obj instanceof String) {
        return obj;
    } else {
        return obj[0];
    }
}
