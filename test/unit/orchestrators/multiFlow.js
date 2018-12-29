const sinon = require("sinon");
const assert = require("chai").assert;

const isFunction = require("lodash/isFunction");

const {
    createFlow,
} = require("../../../orchestrators/multiFlow/index");

const {
    hasOrIsIterator,
} = require("../../../shared");

describe("multiFlow", function () {
    describe("creation", function () {
        it("should throw if getIterFunc is not a function", function () {
            assert.throws(() => createFlow(1));
        });

        it("should throw if piper is not a function", function () {
            assert.throws(() => createFlow(() => { }, 1));
        });

        it("should return proper object", function () {
            const res = createFlow(() => { }, () => { });
            assert.exists(res);
            assert.strictEqual(Object.keys(res).length, 6);
            assert.isTrue(isFunction(res.getGenerator));
            assert.isTrue(isFunction(res.getIterator));
            assert.isTrue(isFunction(res.pipe));
            assert.isTrue(isFunction(res.toArray));
            assert.isTrue(isFunction(res.find));
            assert.isTrue(isFunction(res.firstOrDefault));
        });
    });

    describe("getIterator", function() {
        it("should throw if iter function returns null", function () {
            assert.throws(() => createFlow(() => null, () => null).getIterator());
        });

        it("should throw if iter function returns an object without an iterator", function () {
            assert.throws(() => createFlow(() => ({}), () => null).getIterator());
        });

        it("should return proper wrapped iterator object", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter, () => { }).getIterator();
            assert.exists(res);
            assert.notStrictEqual(fakeIter, res);
            assert.isTrue(Array.from(res).every((x, i) => x === fakeIter[i]));
        });
    });

    describe("getGenerator", function() {
        it("should throw if iter function returns null", function () {
            assert.throws(() => createFlow(() => null, () => null).getGenerator());
        });

        it("should throw if iter function returns an object without an iterator", function () {
            assert.throws(() => createFlow(() => ({}), () => null).getGenerator());
        });

        it("should return proper generator object", function () {
            const fakeIter = [1, 2, 3];
            const fakeIterFunc = () => fakeIter;
            const res = createFlow(fakeIterFunc, () => { }).getGenerator();
            assert.exists(res);
            assert.isTrue(isFunction(res));
            assert.notStrictEqual(fakeIterFunc, res);
            const iter = res();
            assert.isTrue(hasOrIsIterator(iter));
            assert.notStrictEqual(fakeIter, iter);
            assert.isTrue(Array.from(iter).every((x, i) => x === fakeIter[i]));
        });
    });

    describe("toArray", function() {
        it("should throw if iter function returns null", function () {
            assert.throws(() => createFlow(() => null, () => null).toArray());
        });

        it("should throw if iter function returns an object without an iterator", function () {
            assert.throws(() => createFlow(() => ({}), () => null).toArray());
        });

        it("should return proper generator object", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter, () => { }).toArray();
            assert.exists(res);
            assert.isArray(res);
            assert.notStrictEqual(fakeIter, res);
            assert.isTrue(res.every((x, i) => x === fakeIter[i]));
        });
    });

    describe("pipe", function() {
        it("should return a new flow obj, custom piper, return proper values", function () {
            const fakeIter = [1, 2, 3];
            const newFakeIterRes = [4, 5, 6];
            const fakePiperResFunc = sinon.stub().returns(newFakeIterRes);
            const fakePiper = sinon.stub().returns(fakePiperResFunc);
            const originalFlow = createFlow(() => fakeIter, fakePiper);
            const newFlow = originalFlow.pipe(fakePiper);
            assert.exists(originalFlow);
            assert.exists(newFlow);
            assert.notStrictEqual(originalFlow, newFlow);
            const origRes = originalFlow.toArray();
            assert.isTrue(origRes.every((x, i) => x === fakeIter[i]));
            const newRes = newFlow.toArray();
            assert.isTrue(newRes.every((x, i) => x === newFakeIterRes[i]));
            assert.strictEqual(fakePiper.callCount, 1);
            assert.strictEqual(fakePiperResFunc.callCount, 1);
        });

        it("should return a new flow obj, default piper, return proper values", function () {
            const fakeIter = [1, 2, 3];
            const originalFlow = createFlow(() => fakeIter);
            const newFlow = originalFlow.pipe(function* fakeOperator(iter) {
                for(const val of iter) {
                    yield val * 2;
                }
            });
            assert.exists(originalFlow);
            assert.exists(newFlow);
            assert.notStrictEqual(originalFlow, newFlow);
            const origRes = originalFlow.toArray();
            assert.isTrue(origRes.every((x, i) => x === fakeIter[i]));
            const newRes = newFlow.toArray();
            assert.isTrue(newRes.every((x, i) => x === fakeIter[i] * 2));
        });
    });

    describe("firstOrDefault", function() {
        it("should throw if iter function returns null", function () {
            assert.throws(() => createFlow(() => null, () => null).firstOrDefault());
        });

        it("should throw if iter function returns an object without an iterator", function () {
            assert.throws(() => createFlow(() => ({}), () => null).firstOrDefault());
        });

        it("should return first item", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter, () => { }).firstOrDefault();
            assert.exists(res);
            assert.isNumber(res);
            assert.strictEqual(res, fakeIter[0]);
        });

        it("should return null if doesn't exist", function () {
            const fakeIter = [];
            const res = createFlow(() => fakeIter, () => { }).firstOrDefault();
            assert.strictEqual(res, null);
        });

        it("should return default if doesn't exist", function () {
            const fakeIter = [];
            const res = createFlow(() => fakeIter, () => { }).firstOrDefault(50);
            assert.exists(res);
            assert.isNumber(res);
            assert.strictEqual(res, 50);
        });
    });

    describe("find", function() {
        it("should throw if iter function returns null", function () {
            assert.throws(() => createFlow(() => null, () => null).firstOrDefault());
        });

        it("should throw if iter function returns an object without an iterator", function () {
            assert.throws(() => createFlow(() => ({}), () => null).firstOrDefault());
        });

        it("should return first matching element", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter).find((x) => x === 2);
            assert.exists(res);
            assert.isNumber(res);
            assert.strictEqual(res, 2);
        });

        it("should return null if doesn't exist", function () {
            const fakeIter = [];
            const res = createFlow(() => fakeIter).find((x) => x === 2);
            assert.strictEqual(res, null);
        });
    });
});
