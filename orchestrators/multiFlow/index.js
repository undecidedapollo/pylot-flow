const {
    checkExists,
    checkIs,
    hasOrIsIterator,
} = require("../../shared");

const standardPiper = require("../../runtimes/standardPiper");

function createFlow(getIterFunc, piper = standardPiper.buildPiper) {
    function _getExternalIterator() {
        const iter = getIterFunc();
        checkExists(iter);
        checkIs("Iterator", hasOrIsIterator(iter));
        return iter;
    }

    function getIterator() {
        return _getExternalIterator();
    }

    function getGenerator() {
        return function fakeGenerator() {
            return getIterator();
        };
    }

    function pipe(...modifiers) {
        return createFlow(piper(getIterFunc, ...modifiers));
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
