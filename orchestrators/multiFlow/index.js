const isFunction = require("lodash/isFunction");

const filter = require("../../operators/filter");
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

    function firstOrDefault(defaultVal = null) {
        for(const val of getIterator()) {
            return val;
        }

        return defaultVal;
    }

    function find(predicate) {
        return pipe(filter(predicate)).firstOrDefault();
    }

    return {
        getIterator,
        getGenerator,
        pipe,
        toArray,
        find,
        firstOrDefault,
    };
}

module.exports = {
    createFlow,
};
