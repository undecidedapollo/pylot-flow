export const NOOP = (_?: any) => {
    /* NOOP */
};
export const NOOP_PASSTHROUGH = (x) => x;

export const exists = (x) => x !== null && x !== undefined;
export const isNumber = (x) => typeof x === "number";
export const isString = (x) => typeof x === "string";
export const isBoolean = (x) => typeof x === "boolean";
export const isSymbol = (x) => typeof x === "symbol";
export const isPrimitive = (x) => !exists(x) || isNumber(x) || isString(x) || isBoolean(x) || isSymbol(x);
export const isFunction = (x) => typeof x === "function";
export const isArray = (x) => Array.isArray(x);

export function checkExists(x, msg = "Expected object to exist") {
    if (!exists(x)) {
        throw new Error(msg);
    }
}

export function checkHas(type, res, varName = "object", msg = `Expected ${varName} to have a ${type}`) {
    if (!res) {
        throw new Error(msg);
    }
}

export function checkIs(type, res, varName = "object", msg = `Expected ${varName} to be a ${type}`) {
    if (!res) {
        throw new Error(msg);
    }
}

export function hasOrIsIterator(iter) {
    if (isPrimitive(iter)) {
        return false;
    }

    if (Symbol.iterator in iter) {
        return true;
    }

    return false;
}

export function hasOrIsAsyncIterator(iter) {
    if (isPrimitive(iter)) {
        return false;
    }

    if (Symbol.asyncIterator in iter) {
        return true;
    }

    return false;
}

export function getIteratorFromArray(iter) {
    if (Symbol.iterator in iter) {
        return iter[Symbol.iterator]();
    }

    throw new Error("Unable to find iterator on array");
}
