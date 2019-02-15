const isNumber = require("lodash/isNumber");
const isInteger = require("lodash/isInteger");

const {
    checkIs,
} = require("../../shared");

const {
    createFlow,
} = require("../../orchestrators/multiFlow");

function buildPositiveRangeGenerator(start, end, step) {
    return function* positiveRangeGenerator() {
        for (let i = start; i < end; i += step) {
            yield i;
        }
    };
}

function buildNegativeRangeGenerator(start, end, step) {
    return function* negativeRangeGenerator() {
        for (let i = start; i > end; i += step) {
            yield i;
        }
    };
}

function range(start, end, step = 1) {
    checkIs("Number", isNumber(start), "start");
    checkIs("Number", isNumber(end), "end");
    checkIs("Number", isNumber(step), "step");
    checkIs("Integer", isInteger(start), "start");
    checkIs("Integer", isInteger(end), "end");
    checkIs("Integer", isInteger(step), "step");
    checkIs("Number greater than or less than zero", step !== 0, "step");

    const negative = step < 0;
    const validStep = negative ? start >= end : start <= end;
    checkIs("Valid Range", validStep, "range");

    if (negative) {
        return createFlow(buildNegativeRangeGenerator(start, end, step)); 
    }

    return createFlow(buildPositiveRangeGenerator(start, end, step)); 
}

module.exports = range;
