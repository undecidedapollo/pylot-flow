const sinon = require("sinon");
const assert = require("chai").assert;

const {
    forEach,
} = require("../../../operators/forEach/index");

describe("forEach", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items unchanged", function () {
        const stub = sinon.stub().callsFake((x) => !x);
        const res = Array.from(forEach(stub)(boolsArr));
        assert.strictEqual(stub.callCount, 8, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 8, "Expected to return 8 values");
        assert.isTrue(res.every((x, i) => x === boolsArr[i]), "Expected to return values unchanged");
    });

    it("should return number items unchanged", function () {
        const stub = sinon.stub().callsFake((x) => x * 2);
        const res = Array.from(forEach(stub)(numArr));
        assert.strictEqual(stub.callCount, 8, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 8, "Expected to return 8 values");
        assert.isTrue(res.every((x, i) => x === numArr[i]), "Expected to return values unchanged");
    });
});
