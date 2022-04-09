export function localStorageGet(name: string, defaultValue = '') {
    const valueFromStore = localStorage.getItem(name);
    if (valueFromStore === null) return defaultValue; // No value in store, return default one

    try {
        const jsonParsed = JSON.parse(valueFromStore);
        if (['boolean', 'number', 'bigint', 'string', 'object'].includes(typeof jsonParsed)) {
            return jsonParsed;
        }
    } catch (error) { }

    return valueFromStore;
}

export function localStorageSet(name: string, value: any) {
    if (typeof value === 'undefined') {
        return;
    }

    let valueAsString;
    if (typeof value === 'object') {
        valueAsString = JSON.stringify(value);
    } else {
        valueAsString = String(value);
    }

    localStorage.setItem(name, valueAsString);
}

export function localStorageDelete(name: string) {
    if (name) {
        localStorage.removeItem(name);
    } else {
        localStorage.clear();
    }
}
