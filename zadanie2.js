function deepCopy(obj, hash = new WeakMap()) {
    if (obj instanceof Date) return new Date(obj.valueOf());
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Map) return new Map(Array.from(obj, ([key, val]) => [key, deepCopy(val, hash)]));
    if (obj instanceof Set) return new Set(Array.from(obj, (key) => deepCopy(key, hash)));
    if (typeof obj !== 'object' || obj === null) return obj;
    if (hash.has(obj)) return hash.get(obj);

    const result = obj instanceof Array ? [] : obj.constructor ? new obj.constructor() : Object.create(null);
    hash.set(obj, result);

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepCopy(obj[key], hash);
        }
    }
    return result;
}
