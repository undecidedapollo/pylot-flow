import flat from "#operators/flat/index.js";
import { isArray } from "#shared.js";

function isSameArr(arr1, arr2) {
    if(arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((x, i) =>  isArray(x) ? isArray(arr2[i]) && isSameArr(x, arr2[i]) : x === arr2[i])
}

describe("flat", function () {
    const boolsArr = [[true, false, true], false, [true, true], false, false];
    const boolsResArr = [true, false, true, false, true, true, false, false];
    const boolsNestedArr = [[true, [false, true]], false, [[[true]], true], false, false];
    const boolsNestedArrFullFlattenRes = [true, false, true, false, true, true, false, false];
    const boolsNestedArrDepthTwoRes = [true, false, true, false, [true], true, false, false];
    const boolsNestedArrDepthOneRes = [true,  [false, true], false, [[true]], true, false, false];
    const numArr = [1, [2, 3], 4, [5, 6, 7], 8];
    const numResArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should throw if number is null", function () {
        expect(() => flat(null as any)).toThrow();
    });

    it("should throw if number is a decimal", function () {
        expect(() => flat(5.5)).toThrow();
    });

    it("should return boolsArr flattened", function () {
        const res = Array.from(flat()(boolsArr));
        expect(res).toEqual(boolsResArr);

    });

    it("should return boolsNestedArr flattened", function () {
        const res = Array.from(flat()(boolsNestedArr));
        expect(res).toEqual(boolsNestedArrDepthOneRes);
    });

    it("should return boolsNestedArr flattened, depth 2", function () {
        const res = Array.from(flat(2)(boolsNestedArr));
        expect(res).toEqual(boolsNestedArrDepthTwoRes);

    });

    it("should return boolsNestedArr flattened", function () {
        const res = Array.from(flat(10)(boolsNestedArr));
        expect(res).toEqual(boolsNestedArrFullFlattenRes);
    });

    it("should return number items", function () {
        const res = Array.from(flat()(numArr));
        expect(res).toEqual(numResArr);
    });
});