const sinon = require("sinon");
const assert = require("chai").assert;

const {
    buildPiper,
} = require("../../../runtimes/standardPiper/index");

const {
    hasOrIsIterator,
} = require("../../../shared");

describe("standardPiper", function () {
    describe("initial validation", function () {
        it("should throw if getIterFunc does not exist", function () {
            assert.throws(() => buildPiper());
        });

        it("should throw if getIterFunc is not a function", function () {
            assert.throws(() => buildPiper(1));
        });

        it("should throw if modifiers is not an array of functions", function () {
            assert.throws(() => buildPiper(() => { }, 1));
        });

        it("should not throw if modifiers is an empty array", function () {
            assert.doesNotThrow(() => buildPiper(() => { }));
        });
    });

    describe("piper", function () {
        it("should throw if getIterFunc does not return an iterator", function () {
            const iterStub = sinon.stub();
            const modStub1 = sinon.stub();
            assert.throws(() => buildPiper(iterStub, modStub1)());
            assert.strictEqual(iterStub.callCount, 1);
            assert.strictEqual(modStub1.callCount, 0);
        });

        it("should throw if first modifier does not return an iterator", function () {
            const iterStub = sinon.stub().returns([]);
            const modStub1 = sinon.stub();
            const modStub2 = sinon.stub();
            const modStub3 = sinon.stub();
            assert.throws(() => buildPiper(iterStub, modStub1, modStub2, modStub3)());
            assert.strictEqual(iterStub.callCount, 1);
            assert.strictEqual(modStub1.callCount, 1);
            assert.strictEqual(modStub2.callCount, 0);
            assert.strictEqual(modStub3.callCount, 0);
        });

        it("should throw if second modifier does not return an iterator", function () {
            const iterStub = sinon.stub().returns([]);
            const modStub1 = sinon.stub().returns([]);
            const modStub2 = sinon.stub();
            const modStub3 = sinon.stub();
            assert.throws(() => buildPiper(iterStub, modStub1, modStub2, modStub3)());
            assert.strictEqual(iterStub.callCount, 1);
            assert.strictEqual(modStub1.callCount, 1);
            assert.strictEqual(modStub2.callCount, 1);
            assert.strictEqual(modStub3.callCount, 0);
        });

        it("should throw if third modifier does not return an iterator", function () {
            const iterStub = sinon.stub().returns([]);
            const modStub1 = sinon.stub().returns([]);
            const modStub2 = sinon.stub().returns([]);
            const modStub3 = sinon.stub();
            assert.throws(() => buildPiper(iterStub, modStub1, modStub2, modStub3)());
            assert.strictEqual(iterStub.callCount, 1);
            assert.strictEqual(modStub1.callCount, 1);
            assert.strictEqual(modStub2.callCount, 1);
            assert.strictEqual(modStub3.callCount, 1);
        });


        it("should return iterator and properly pipe sequence", function () {
            const iterStub = sinon.stub().returns([1]);
            const modStub1 = sinon.stub().callsFake((iter) => [iter[0] * 2]);
            const modStub2 = sinon.stub().callsFake((iter) => [iter[0] * 2]);
            const modStub3 = sinon.stub().callsFake((iter) => [iter[0] * 2]);
            const res = buildPiper(iterStub, modStub1, modStub2, modStub3)();
            assert.strictEqual(iterStub.callCount, 1);
            assert.strictEqual(modStub1.callCount, 1);
            assert.strictEqual(modStub2.callCount, 1);
            assert.strictEqual(modStub3.callCount, 1);
            assert.isTrue(hasOrIsIterator(res));
            const resArr = Array.from(res);
            assert.strictEqual(resArr.length, 1);
            assert.strictEqual(resArr[0], 8);
        });
    });
});
