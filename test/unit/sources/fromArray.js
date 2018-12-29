const assert = require("chai").assert;

const {
    fromArray,
} = require("../../../sources/fromArray/index");

describe("fromArray", function () {
    it("should throw if item is undefined", function () {
        assert.throws(() => fromArray(undefined));
    });

    it("should throw if item is null", function () {
        assert.throws(() => fromArray(null));
    });


    it("should throw if item is number", function () {
        assert.throws(() => fromArray(123));
    });


    it("should throw if item is string", function () {
        assert.throws(() => fromArray("abc"));
    });


    it("should throw if item is boolean", function () {
        assert.throws(() => fromArray(true));
    });


    it("should return flowObj, return number items unchanged", function () {
        const numArr = [1, 2, 3];
        const res = fromArray(numArr);
        assert.exists(res);
        const arrRes = res.toArray();
        assert.isArray(arrRes);
        assert.strictEqual(arrRes.length, numArr.length);
        assert.isTrue(arrRes.every((x, i) => x === numArr[i]), "Expected to return values unchanged");
    });
});
