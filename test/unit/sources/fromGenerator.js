const sinon = require("sinon");
const assert = require("chai").assert;

const {
    fromGenerator,
} = require("../../../sources/fromGenerator/index");

describe("fromGenerator", function () {
    it("should throw if item is undefined", function () {
        assert.throws(() => fromGenerator(undefined));
    });

    it("should throw if item is null", function () {
        assert.throws(() => fromGenerator(null));
    });


    it("should throw if item is number", function () {
        assert.throws(() => fromGenerator(123));
    });


    it("should throw if item is string", function () {
        assert.throws(() => fromGenerator("abc"));
    });


    it("should throw if item is boolean", function () {
        assert.throws(() => fromGenerator(true));
    });    

    it("should return flowObj, return number items unchanged", function () {
        const numArr = [1, 2, 3];
        const res = fromGenerator(function* myGen() {
            yield* numArr;
        });
        assert.exists(res);
        const arrRes = res.toArray();
        assert.isArray(arrRes);
        assert.strictEqual(arrRes.length, numArr.length);
        assert.isTrue(arrRes.every((x, i) => x === numArr[i]), "Expected to return values unchanged");
    });
});
