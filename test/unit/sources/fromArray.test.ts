import fromArray from "../../../src/sources/fromArray/index";

describe("fromArray", function () {
    it("should throw if item is undefined", function () {
        expect(() => fromArray(undefined)).toThrow();
    });

    it("should throw if item is null", function () {
        expect(() => fromArray(null)).toThrow();
    });


    it("should throw if item is number", function () {
        expect(() => fromArray(123)).toThrow();
    });


    it("should throw if item is string", function () {
        expect(() => fromArray("abc")).toThrow();
    });


    it("should throw if item is boolean", function () {
        expect(() => fromArray(true)).toThrow();
    });


    it("should return flowObj, return number items unchanged", function () {
        const numArr = [1, 2, 3];
        const res = fromArray(numArr);
        expect(res).toBeDefined();
        const arrRes = res.toArray();
        expect(arrRes).toBeInstanceOf(Array);
        expect(arrRes.length).toBe(numArr.length);
        expect(arrRes.every((x, i) => x === numArr[i])).toBe(true);
    });
});
