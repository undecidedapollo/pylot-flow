const assert = require("chai").assert;

const {
    range,
} = require("../../../sources/range/index");

describe("range", function () {
    it("should throw if start is not a number", function () {
        assert.throws(() => range(true));
    });

    it("should throw if end is not a number", function () {
        assert.throws(() => range(1, true));
    });

    it("should throw if step is not a number", function () {
        assert.throws(() => range(1, 5, true));
    });

    it("should throw if start is a decimal", function () {
        assert.throws(() => range(1.1, 5, 1));
    });

    it("should throw if end is a decimal", function () {
        assert.throws(() => range(1, 5.1, 1));
    });

    it("should throw if step is a decimal", function () {
        assert.throws(() => range(1, 5, 1.1));
    });

    it("should throw if step is 0", function () {
        assert.throws(() => range(1, 5, 0));
    });

    it("should throw if positive range negative step range is invalid", function () {
        assert.throws(() => range(1, 5, -1));
    });

    it("should throw if positive range negative step range is invalid", function () {
        assert.throws(() => range(-5, 1, -1));
    });

    it("should throw if negative range positive step is invalid", function () {
        assert.throws(() => range(5, 1, 1));
    });

    it("should throw if negative range positive step is invalid", function () {
        assert.throws(() => range(-1, -5, 1));
    });

    function validateSequence(rangeFlow, arr) {
        assert.exists(rangeFlow);
        const flowRes = rangeFlow.toArray();
        assert.isArray(flowRes);
        assert.strictEqual(flowRes.length, arr.length);
        assert.isTrue(flowRes.every((x, i) => x === arr[i]));
    }

    it("should return seq for 1, 5, 1", function () {
        validateSequence(range(1, 5, 1), [1, 2, 3, 4]);
    });

    it("should return seq for -5, 5, 1", function () {
        validateSequence(range(-5, 5, 1), [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4]);
    });

    it("should return seq for 5, 1, -1", function () {
        validateSequence(range(5, 1, -1), [5, 4, 3, 2]);
    });

    it("should return seq for 5, -5, -1", function () {
        validateSequence(range(5, -5, -1), [5, 4, 3, 2, 1, 0, -1, -2, -3, -4]);
    });

    it("should return seq for -50, 32, 10", function () {
        validateSequence(range(-50, 32, 10), [-50, -40, -30, -20, -10, 0, 10, 20, 30]);
    });

    it("should return seq for 50, -32, -10", function () {
        validateSequence(range(50, -32, -10), [50, 40, 30, 20, 10, 0, -10, -20, -30]);
    });

    it("should return seq for 0, 0, 1", function () {
        validateSequence(range(0, 0, 1), []);
    });

    it("should return seq for 0, 0, -1", function () {
        validateSequence(range(0, 0, -1), []);
    });

    it("should return seq for 1, 5, default", function () {
        validateSequence(range(1, 5), [1, 2, 3, 4]);
    });

});
