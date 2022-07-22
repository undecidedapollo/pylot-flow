import fromGenerator from "../../../src/sources/fromGenerator/index";

describe("fromGenerator", function () {
    it("should throw if item is undefined", function () {
        expect(() => fromGenerator(undefined as any)).toThrow();
    });

    it("should throw if item is null", function () {
        expect(() => fromGenerator(null as any)).toThrow();
    });


    it("should throw if item is number", function () {
        expect(() => fromGenerator(123 as any)).toThrow();
    });


    it("should throw if item is string", function () {
        expect(() => fromGenerator("abc" as any)).toThrow();
    });


    it("should throw if item is boolean", function () {
        expect(() => fromGenerator(true as any)).toThrow();
    });    

    it("should return flowObj, return number items unchanged", function () {
        const numArr = [1, 2, 3];
        const res = fromGenerator(function* myGen() {
            yield* numArr;
        });
        expect(res).toBeDefined();
        const arrRes = res.toArray();
        expect(arrRes).toBeInstanceOf(Array);
        expect(arrRes.length).toBe(numArr.length);
        expect(arrRes.every((x, i) => x === numArr[i])).toBe(true);
    });
});
