import * as isNumber from "lodash.isnumber";
import * as isString from "lodash.isstring";
import * as isBoolean from "lodash.isboolean";
import * as isSymbol from "lodash.issymbol";
export * as isFunction from "lodash.isfunction";

export const NOOP = (x?: any) => { /* NOOP */ }; // eslint-disable-line @typescript-eslint/no-unused-vars
export const NOOP_PASSTHROUGH = (x) => x;

export const exists = (x) => x !== null && x !== undefined;
export const isPrimitive = (x) => !exists(x) || isNumber(x) || isString(x) || isBoolean(x) || isSymbol(x);

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

    if ((Symbol.iterator in iter)) {
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
