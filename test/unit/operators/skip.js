const assert = require("chai").assert;

const {
    skip,
} = require("../../../operators/skip/index");

describe("skip", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items unchanged", function () {
        const res = Array.from(skip(4)(boolsArr));
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x, i) => x === boolsArr[i + 4]), "Expected to return values unchanged");
    });

    it("should return number items unchanged", function () {
        const res = Array.from(skip(4)(numArr));
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x, i) => x === numArr[i + 4]), "Expected to return values unchanged");
    });
});
