const assert = require("chai").assert;
const isError = require("lodash/isError");


const {
    NOOP,
    NOOP_PASSTHROUGH,
    checkExists,
    checkHas,
    checkIs,
    exists,
    isPrimitive,
    getIteratorFromArray,
    hasOrIsIterator,
} = require("../../../shared");

describe("shared", function () {
    describe("NOOP", function() {
        it("should return and do nothing", function() {
            assert.notExists(NOOP(5));
        });
    });

    describe("NOOP_PASSTHROUGH", function() {
        it("should return and do nothing", function() {
            assert.strictEqual(NOOP_PASSTHROUGH(5), 5);
        });
    });

    describe("isPrimitive", function () {
        it("should be true if item is null", function () {
            assert.isTrue(isPrimitive(null));
        });

        it("should be true if item is undefined", function () {
            assert.isTrue(isPrimitive(undefined));
        });

        it("should be true if item is boolean", function () {
            assert.isTrue(isPrimitive(false));
        });

        it("should be true if item is number", function () {
            assert.isTrue(isPrimitive(0));
        });

        it("should be true if item is string", function () {
            assert.isTrue(isPrimitive(""));
        });

        it("should be true if item is local symbol", function () {
            assert.isTrue(isPrimitive(Symbol("ABC")));
        });

        it("should be true if item is local symbol", function () {
            assert.isTrue(isPrimitive(Symbol.for("ABC")));
        });

        it("should be false if item is array", function () {
            assert.isFalse(isPrimitive([]));
        });

        it("should be false if item is obj", function () {
            assert.isFalse(isPrimitive({}));
        });
    });

    describe("exists", function () {
        it("should be false if item is null", function () {
            assert.isFalse(exists(null));
        });

        it("should be false if item is undefined", function () {
            assert.isFalse(exists(undefined));
        });

        it("should be true if item is boolean", function () {
            assert.isTrue(exists(false));
        });

        it("should be true if item is number", function () {
            assert.isTrue(exists(0));
        });

        it("should be true if item is string", function () {
            assert.isTrue(exists(""));
        });

        it("should be true if item is array", function () {
            assert.isTrue(exists([]));
        });

        it("should be true if item is obj", function () {
            assert.isTrue(exists({}));
        });
    });

    describe("checkExists", function () {
        it("should throw if item is null", function () {
            try {
                checkExists(null);

            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, "Expected object to exist");
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should throw if item is undefined", function () {
            try {
                checkExists(undefined);

            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, "Expected object to exist");
                return;
            }

            throw new Error("Not supposed to be here");
        });


        it("should throw if item is undefined, custom msg", function () {
            const msg = "abc";
            try {
                checkExists(undefined, msg);

            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should not throw if item is boolean", function () {
            checkExists(false);
        });

        it("should not throw if item is number", function () {
            checkExists(0);
        });

        it("should not throw if item is string", function () {
            checkExists("");
        });

        it("should not throw if item is array", function () {
            checkExists([]);
        });

        it("should not throw if item is obj", function () {
            checkExists({});
        });
    });

    describe("checkHas", function () {
        it("should throw proper message if false", function () {
            const type = "TYPE";
            const objName = "object";
            const msg = `Expected ${objName} to have a ${type}`;
            try {
                checkHas(type, false);
            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should throw proper message if false", function () {
            const type = "TYPE";
            const objName = "myObj";
            const msg = `Expected ${objName} to have a ${type}`;
            try {
                checkHas(type, false, objName);
            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should throw proper message if false", function () {
            const type = "TYPE";
            const objName = "myObj";
            const msg = `FAKEMSG`;
            try {
                checkHas(type, false, objName, msg);have
            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should not throw if true", function () {
            const type = "TYPE";
            checkHas(type, true);
        });


        it("should not throw if true", function () {
            const type = "TYPE";
            const objName = "myObj";
            checkHas(type, true, objName);
        });

        it("should not throw if true", function () {
            const type = "TYPE";
            const objName = "myObj";
            const msg = `FAKEMSG`;
            checkHas(type, true, objName, msg);
        });
    });

    describe("checkIs", function () {
        it("should throw proper message if false", function () {
            const type = "TYPE";
            const objName = "object";
            const msg = `Expected ${objName} to be a ${type}`;
            try {
                checkIs(type, false);
            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should throw proper message if false", function () {
            const type = "TYPE";
            const objName = "myObj";
            const msg = `Expected ${objName} to be a ${type}`;
            try {
                checkIs(type, false, objName);
            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should throw proper message if false", function () {
            const type = "TYPE";
            const objName = "myObj";
            const msg = `FAKEMSG`;
            try {
                checkIs(type, false, objName, msg);
            } catch (ex) {
                assert.isTrue(isError(ex));
                assert.strictEqual(ex.message, msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should not throw if true", function () {
            const type = "TYPE";
            checkIs(type, true);
        });


        it("should not throw if true", function () {
            const type = "TYPE";
            const objName = "myObj";
            checkIs(type, true, objName);
        });

        it("should not throw if true", function () {
            const type = "TYPE";
            const objName = "myObj";
            const msg = `FAKEMSG`;
            checkIs(type, true, objName, msg);
        });
    });

    describe("hasOrIsIterator", function () {
        it("should be true if array", function () {
            assert.isTrue(hasOrIsIterator([]));
        });

        it("should be true if iterator", function () {
            assert.isTrue(hasOrIsIterator([][Symbol.iterator]()));
        });

        it("should be true if generator -> iterator", function () {
            assert.isTrue(hasOrIsIterator((function* (){})()));
        });

        it("should be false if generator", function () {
            assert.isFalse(hasOrIsIterator(function* (){}));
        });

        it("should be false if boolean", function () {
            assert.isFalse(hasOrIsIterator(true));
        });

        it("should be false if number", function () {
            assert.isFalse(hasOrIsIterator(1));
        });

        it("should be false if string", function () {
            assert.isFalse(hasOrIsIterator(""));
        });

        it("should be false if obj", function () {
            assert.isFalse(hasOrIsIterator({}));
        });
    });

    describe("getIteratorFromArray", function () {
        it("should return iterator for array", function () {
            const arr = [1, 2, 3];
            const iter = getIteratorFromArray(arr);
            assert.notStrictEqual(arr, iter);
            const iterArr = Array.from(iter);
            assert.strictEqual(iterArr.length, arr.length);
            assert.isTrue(iterArr.every((x, i) => x === arr[i]));
        });

        it("should throw if iterator field not on obj.", function () {
            assert.throws(() => getIteratorFromArray({}));
        });
    });
});
