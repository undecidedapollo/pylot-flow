const isFunction = require("lodash/isFunction");

const {
    checkExists,
    checkIs,
    hasOrIsIterator,
} = require("../../shared");

const standardPiper = require("../../runtimes/standardPiper");

function createFlow(getIterFunc, piper = standardPiper.buildPiper) {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");
    checkIs("Function", isFunction(piper), "piper");

    function _getExternalIterator() {
        const iter = getIterFunc();
        checkExists(iter);
        checkIs("Iterator", hasOrIsIterator(iter));
        return iter;
    }

    function getGenerator() {
        const iter = _getExternalIterator();
        return function* fakeGenerator() {
            yield* iter;
        };
    }

    function getIterator() {
        return getGenerator()();
    }

    function pipe(...modifiers) {
        return createFlow(piper(getIterFunc, ...modifiers), piper);
    }

    function toArray() {
        return Array.from(getIterator());
    }

    return {
        getIterator,
        getGenerator,
        pipe,
        toArray,
    };
}

module.exports = {
    createFlow,
};
