const _ = require("lodash");

const exists = (x) => x !== null && x !== undefined;

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
    if (Symbol.asyncIterator in iter || Symbol.iterator in iter) {
        return true;
    }

    return false;
}

function getIteratorFromArray(iter) {
    if (Symbol.asyncIterator in iter) {
        return iter[Symbol.asyncIterator]();
    }

    if(Symbol.iterator in iter) {
        return iter[Symbol.iterator]();
    }

    throw new Error("Unable to find iterator on array");
}


module.exports = {
    exists,
    checkExists,
    checkHas,
    checkIs,
    hasOrIsIterator,
    getIteratorFromArray,
};