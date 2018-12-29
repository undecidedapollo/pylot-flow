const assert = require("chai").assert;

const take = require("../../../operators/take/index");

describe("take", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items unchanged", function () {
        const res = Array.from(take(4)(boolsArr));
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x, i) => x === boolsArr[i]), "Expected to return values unchanged");
    });

    it("should return number items unchanged", function () {
        const res = Array.from(take(4)(numArr));
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x, i) => x === numArr[i]), "Expected to return values unchanged");
    });

    it("should return empty iter when take = 0", function () {
        const res = Array.from(take(0)(numArr));
        assert.strictEqual(res.length, 0, "Expected to return 0 values");
        assert.isTrue(res.every((x, i) => x === numArr[i]), "Expected to return values unchanged");
    });
});
