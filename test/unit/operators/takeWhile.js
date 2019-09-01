const sinon = require("sinon");
const assert = require("chai").assert;

const takeWhile = require("../../../operators/takeWhile/index");

describe("takeWhile", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should only return boolean items until condition is false", function () {
        const stub = sinon.stub().returns(true).onCall(4).returns(false);
        const res = Array.from(takeWhile(stub)(boolsArr));
        assert.strictEqual(stub.callCount, 5, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x, i) => x === boolsArr[i]), "Expected to return values unchanged");
    });

    it("should only return number items until condition is false", function () {
        const stub = sinon.stub().returns(true).onCall(4).returns(false);
        const res = Array.from(takeWhile(stub)(numArr));
        assert.strictEqual(stub.callCount, 5, "Expected predicate to be invoked.");
        assert.strictEqual(res.length, 4, "Expected to return 4 values");
        assert.isTrue(res.every((x, i) => x === numArr[i]), "Expected to return values unchanged");
    });
});
