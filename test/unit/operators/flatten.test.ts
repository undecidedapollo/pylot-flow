import * as isArray from "lodash.isarray";
import flatten from "../../../src/operators/flatten/index";

function isSameArr(arr1, arr2) {
    if(arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((x, i) =>  isArray(x) ? isArray(arr2[i]) && isSameArr(x, arr2[i]) : x === arr2[i])
}

describe("flatten", function () {
    const boolsArr = [[true, false, true], false, [true, true], false, false];
    const boolsResArr = [true, false, true, false, true, true, false, false];
    const boolsNestedArr = [[true, [false, true]], false, [[[true]], true], false, false];
    const boolsNestedArrFullFlattenRes = [true, false, true, false, true, true, false, false];
    const boolsNestedArrDepthTwoRes = [true, false, true, false, [true], true, false, false];
    const numArr = [1, [2, 3], 4, [5, 6, 7], 8];
    const numResArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should throw if number is null", function () {
        expect(() => flatten(null as any)).toThrow();
    });

    it("should throw if number is a decimal", function () {
        expect(() => flatten(5.5)).toThrow();
    });

    it("should return boolsArr flattened", function () {
        const res = Array.from(flatten()(boolsArr));
        expect(isSameArr(res, boolsResArr)).toBe(true);
    });

    it("should return boolsNestedArr flattened", function () {
        const res = Array.from(flatten()(boolsNestedArr));
        expect(isSameArr(res, boolsNestedArrFullFlattenRes)).toBe(true);
    });

    it("should return boolsNestedArr flattened, depth 2", function () {
        const res = Array.from(flatten(2)(boolsNestedArr));
        expect(isSameArr(res, boolsNestedArrDepthTwoRes)).toBe(true);
    });

    it("should return number items", function () {
        const res = Array.from(flatten()(numArr));
        expect(isSameArr(res, numResArr)).toBe(true);
    });
});