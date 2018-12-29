const isArray = require("lodash/isArray");

const {
    checkIs,
    checkHas,
    hasOrIsIterator,
    getIteratorFromArray,
} = require("../../shared");

const {
    createFlow,
} = require("../../orchestrators/multiFlow");

function fromArray(arr) {
    checkIs("Array", isArray(arr));
    checkHas("Iterator", hasOrIsIterator(arr));

    return createFlow(function getIterFromArr() {
        return getIteratorFromArray(arr);
    });
}

module.exports = {
    fromArray,
};
