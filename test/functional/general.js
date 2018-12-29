const sinon = require("sinon");
const assert = require("chai").assert;

const filter = require("../../operators/filter");
const forEach = require("../../operators/forEach");
const map = require("../../operators/map");
const skip = require("../../operators/skip");
const take = require("../../operators/take");


const flow = require("../../index");

describe("general library tests", function () {
    const origArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const resArr = [8, 12, 16];

    describe("fromArray", function() {
        it("should return proper sequence", function() {
            const initialStub = sinon.stub();
            const preFilterStub = sinon.stub();
            const postFilterStub = sinon.stub();
            const postMapStub = sinon.stub();
            const res = flow
            .fromArray(origArr)
            .pipe(forEach(initialStub), skip(2))
            .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
            .pipe(map(x => x * 2), take(3), forEach(postMapStub))
            .toArray();

            assert.isArray(res);
            assert.strictEqual(res.length, resArr.length);
            assert.isTrue(res.every((x, i) => x === resArr[i]));
            assert.strictEqual(initialStub.callCount, 8);
            assert.strictEqual(preFilterStub.callCount, 6);
            assert.strictEqual(postFilterStub.callCount, 3);
            assert.strictEqual(postMapStub.callCount, 3);
        });
    });

    describe("fromGenerator", function() {
        it("should return proper sequence", function() {
            const initialStub = sinon.stub();
            const preFilterStub = sinon.stub();
            const postFilterStub = sinon.stub();
            const postMapStub = sinon.stub();
            const res = flow
            .fromGenerator(function* myGenerator() {
                yield* origArr;
            })
            .pipe(forEach(initialStub), skip(2))
            .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
            .pipe(map(x => x * 2), take(3), forEach(postMapStub))
            .toArray();

            assert.isArray(res);
            assert.strictEqual(res.length, resArr.length);
            assert.isTrue(res.every((x, i) => x === resArr[i]));
            assert.strictEqual(initialStub.callCount, 8);
            assert.strictEqual(preFilterStub.callCount, 6);
            assert.strictEqual(postFilterStub.callCount, 3);
            assert.strictEqual(postMapStub.callCount, 3);
        });
    });

    describe("range", function() {
        it("should return proper sequence", function() {
            const initialStub = sinon.stub();
            const preFilterStub = sinon.stub();
            const postFilterStub = sinon.stub();
            const postMapStub = sinon.stub();
            const res = flow
            .range(1, 11, 1)
            .pipe(forEach(initialStub), skip(2))
            .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
            .pipe(map(x => x * 2), take(3), forEach(postMapStub))
            .toArray();

            assert.isArray(res);
            assert.strictEqual(res.length, resArr.length);
            assert.isTrue(res.every((x, i) => x === resArr[i]));
            assert.strictEqual(initialStub.callCount, 8);
            assert.strictEqual(preFilterStub.callCount, 6);
            assert.strictEqual(postFilterStub.callCount, 3);
            assert.strictEqual(postMapStub.callCount, 3);
        });
    });
});
