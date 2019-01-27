const assert = require("chai").assert;

const bundle = require("../../../operators/bundle/index");

describe("bundle", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should only return boolean items that match condition", function () {
        const res = Array.from(bundle(2)(boolsArr));
        assert.strictEqual(res.length, 4, "Expected to return 2 values");
        assert.isTrue(res.every((x, i1) => x.every((y, i2) => y === boolsArr[(i1 * 2) + i2])), "Expected to return bundled values");
    });

    it("% === 0, should only return number items that match condition", function () {
        const res = Array.from(bundle(4)(numArr));
        assert.strictEqual(res.length, 2, "Expected to return 4 values");
        assert.isTrue(res.every((x, i1) => x.every((y, i2) => y === numArr[(i1 * 4) + i2])), "Expected to return bundled values");
    });

    it("% !== 0, should only return number items that match condition", function () {
        const res = Array.from(bundle(3)(numArr));
        assert.strictEqual(res.length, 3, "Expected to return 3 values");
        assert.isTrue(res.every((x, i1) => x.every((y, i2) => y === numArr[(i1 * 3) + i2])), "Expected to return bundled values");
    });
});
