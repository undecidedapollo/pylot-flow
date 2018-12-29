const sinon = require("sinon");
const assert = require("chai").assert;

const {
    filter,
} = require("../../../operators/filter/index");

describe("filter", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should only return boolean items that match condition", function () {
        const stub = sinon.stub().callsFake((x) => x);
        const res = Array.from(filter(stub)(boolsArr));
        assert.strictEqual(stub.callCount, 8, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x) => x === true), "Expected to return all true values");
    });

    it("should only return number items that match condition", function () {
        const stub = sinon.stub().callsFake((x) => x % 2 === 0);
        const res = Array.from(filter(stub)(numArr));
        assert.strictEqual(stub.callCount, 8, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x) => x % 2 === 0), "Expected to return all true values");
    });
});
