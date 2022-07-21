import {
    NOOP,
    NOOP_PASSTHROUGH,
    checkExists,
    checkHas,
    checkIs,
    exists,
    isPrimitive,
    getIteratorFromArray,
    hasOrIsIterator,
} from "../../src/shared";

// Convert all chai assert calls to jest expect calls

describe("shared", function () {
    describe("NOOP", function() {
        it("should return and do nothing", function() {
            expect(NOOP(5)).toBeUndefined();
        });
    });

    describe("NOOP_PASSTHROUGH", function() {
        it("should return and do nothing", function() {
            expect(NOOP_PASSTHROUGH(5)).toBe(5);
        });
    });

    describe("isPrimitive", function () {
        it("should be true if item is null", function () {
            expect(isPrimitive(null)).toBe(true);
        });

        it("should be true if item is undefined", function () {
            expect(isPrimitive(undefined)).toBe(true);
        });

        it("should be true if item is boolean", function () {
            expect(isPrimitive(false)).toBe(true);
        });

        it("should be true if item is number", function () {
            expect(isPrimitive(0)).toBe(true);
        });

        it("should be true if item is string", function () {
            expect(isPrimitive("")).toBe(true);
        });

        it("should be true if item is local symbol", function () {
            expect(isPrimitive(Symbol("ABC"))).toBe(true);
        });

        it("should be true if item is local symbol", function () {
            expect(isPrimitive(Symbol.for("ABC"))).toBe(true);
        });

        it("should be false if item is array", function () {
            expect(isPrimitive([])).toBe(false);
        });

        it("should be false if item is obj", function () {
            expect(isPrimitive({})).toBe(false);
        });
    });

    describe("exists", function () {
        it("should be false if item is null", function () {
            expect(exists(null)).toBe(false);
        });

        it("should be false if item is undefined", function () {
            expect(exists(undefined)).toBe(false);
        });

        it("should be true if item is boolean", function () {
            expect(exists(false)).toBe(true);
        });

        it("should be true if item is number", function () {
            expect(exists(0)).toBe(true);
        });

        it("should be true if item is string", function () {
            expect(exists("")).toBe(true);
        });

        it("should be true if item is array", function () {
            expect(exists([])).toBe(true);
        });

        it("should be true if item is obj", function () {
            expect(exists({})).toBe(true);
        });
    });

    describe("checkExists", function () {
        it("should throw if item is null", function () {
            try {
                checkExists(null);

            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe("Expected object to exist");
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should throw if item is undefined", function () {
            try {
                checkExists(undefined);

            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe("Expected object to exist");
                return;
            }

            throw new Error("Not supposed to be here");
        });


        it("should throw if item is undefined, custom msg", function () {
            const msg = "abc";
            try {
                checkExists(undefined, msg);

            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe(msg);
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
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe(msg);
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
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe(msg);
                return;
            }

            throw new Error("Not supposed to be here");
        });

        it("should throw proper message if false", function () {
            const type = "TYPE";
            const objName = "myObj";
            const msg = `FAKEMSG`;
            try {
                checkHas(type, false, objName, msg);
            } catch (ex) {
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe(msg);
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
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe(msg);
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
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe(msg);
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
                expect(ex).toBeInstanceOf(Error);
                expect(ex.message).toBe(msg);
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
            expect(hasOrIsIterator([])).toBe(true);
        });

        it("should be true if iterator", function () {
            expect(hasOrIsIterator([][Symbol.iterator]())).toBe(true);
        });

        it("should be true if generator -> iterator", function () {
            expect(hasOrIsIterator((function* (){})())).toBe(true);
        });

        it("should be false if generator", function () {
            expect(hasOrIsIterator(function* (){})).toBe(false);
        });

        it("should be false if boolean", function () {
            expect(hasOrIsIterator(true)).toBe(false);

        });

        it("should be false if number", function () {
            expect(hasOrIsIterator(1)).toBe(false);
        });

        it("should be false if string", function () {
            expect(hasOrIsIterator("")).toBe(false);
        });

        it("should be false if obj", function () {
            expect(hasOrIsIterator({})).toBe(false);
        });
    });

    describe("getIteratorFromArray", function () {
        it("should return iterator for array", function () {
            const arr = [1, 2, 3];
            const iter = getIteratorFromArray(arr);
            expect(arr).not.toBe(iter);
            const iterArr = Array.from(iter);
            expect(arr.length).toBe(iterArr.length);
            expect(iterArr.every((x, i) => x === arr[i])).toBe(true);
        });

        it("should throw if iterator field not on obj.", function () {
            expect(() => getIteratorFromArray({})).toThrow();
        });
    });
});
