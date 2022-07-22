import * as isNumber from "lodash.isnumber";
import * as isInteger from "lodash.isinteger";

import {
    checkIs,
} from "../../shared";

import {
    createFlow,
} from "../../orchestrators/multiFlow";
import { Flow } from "../../types";

function buildPositiveRangeGenerator(start: number, end: number, step: number) {
    return function* positiveRangeGenerator() {
        for (let i = start; i < end; i += step) {
            yield i;
        }
    };
}

function buildNegativeRangeGenerator(start: number, end: number, step: number) {
    return function* negativeRangeGenerator() {
        for (let i = start; i > end; i += step) {
            yield i;
        }
    };
}

export default function range(start: number, end: number, step = 1) : Flow<number> {
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
