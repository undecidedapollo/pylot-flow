const isNumber = require("lodash/isNumber");
const isString = require("lodash/isString");
const isBoolean = require("lodash/isBoolean");
const isSymbol = require("lodash/isSymbol");

const exists = (x) => x !== null && x !== undefined;
const isPrimitive = (x) => !exists(x) || isNumber(x) || isString(x) || isBoolean(x) || isSymbol(x)

function checkExists(x, msg = "Expected object to exist") {
    if (!exists(x)) {
        throw new Error(msg);
    }
}

function checkHas(type, res, varName = "object", msg = `Expected ${varName} to have a ${type}`) {
    if (!res) {
        throw new Error(msg);
    }
}

function checkIs(type, res, varName = "object", msg = `Expected ${varName} to be a ${type}`) {
    if (!res) {
        throw new Error(msg);
    }
}

function hasOrIsIterator(iter) {
    if (isPrimitive(iter)) {
        return false;
    }

    if ((Symbol.iterator in iter)) {
        return true;
    }

    return false;
}

function getIteratorFromArray(iter) {
    if (Symbol.iterator in iter) {
        return iter[Symbol.iterator]();
    }

    throw new Error("Unable to find iterator on array");
}


module.exports = {
    exists,
    isPrimitive,
    checkExists,
    checkHas,
    checkIs,
    hasOrIsIterator,
    getIteratorFromArray,
};