const isFunction = require("lodash/isFunction");

const {
    checkExists,
    checkIs,
} = require("../../shared");

const {
    createFlow,
} = require("../../orchestrators/multiFlow");

function fromGenerator(getIterFunc) {
    checkExists(getIterFunc);
    checkIs("Function", isFunction(getIterFunc));
    return createFlow(getIterFunc);
}

module.exports = fromGenerator;
