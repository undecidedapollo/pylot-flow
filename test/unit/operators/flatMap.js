const sinon = require("sinon");
const assert = require("chai").assert;

const flatMap = require("../../../operators/flatMap/index");

describe("map", function () {
    const boolsArr = [[true, false, true], false, [true, true], false, false];
    const boolsResArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, [2, 3], 4, [5, 6, 7], 8];
    const numResArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items inverted", function () {
        const res = Array.from(flatMap()(boolsArr));
        assert.strictEqual(res.length, 8, "Expected to return 8 values");
        assert.isTrue(res.every((x, i) => x === boolsResArr[i]), "Expected to return inverted values");
    });

    it("should return number items multiplied by two", function () {
        const res = Array.from(flatMap()(numArr));
        assert.strictEqual(res.length, 8, "Expected to return 8 values");
        assert.isTrue(res.every((x, i) => x === numResArr[i]), "Expected to return values multiplied by two");
    });

    it("should return boolean items, call stub", function () {
        const stub = sinon.stub().callsFake((x) => x);
        const res = Array.from(flatMap(stub)(boolsArr));
        assert.strictEqual(stub.callCount, 5, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 8, "Expected to return 8 values");
        assert.isTrue(res.every((x, i) => x === boolsResArr[i]), "Expected to return inverted values");
    });

    it("should return number items, call stub", function () {
        const stub = sinon.stub().callsFake((x) => x);
        const res = Array.from(flatMap(stub)(numArr));
        assert.strictEqual(stub.callCount, 5, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 8, "Expected to return 8 values");
        assert.isTrue(res.every((x, i) => x === numResArr[i]), "Expected to return values multiplied by two");
    });
});
