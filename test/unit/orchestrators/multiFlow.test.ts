import {
    createFlow,
} from "../../../src/orchestrators/multiFlow/index";

import {
    hasOrIsIterator,
    isFunction,
} from "../../../src/shared";

describe("multiFlow", function () {
    describe("creation", function () {
        it("should throw if getIterFunc is not a function", function () {
            expect(() => createFlow(1)).toThrow();
        });

        it("should throw if piper is not a function", function () {
            expect(() => createFlow((() => { }) as any, 1 as any)).toThrow();
        });

        it("should return proper object", function () {
            const res = createFlow((() => { }) as any, (() => { }) as any);
            expect(res).toBeTruthy();
            expect(Object.keys(res).length).toBe(7);
            expect(isFunction(res.getGenerator)).toBe(true);
            expect(isFunction(res.getIterator)).toBe(true);
            expect(isFunction(res.pipe)).toBe(true);
            expect(isFunction(res.toArray)).toBe(true);
            expect(isFunction(res.find)).toBe(true);
            expect(isFunction(res.firstOrDefault)).toBe(true);
            expect(isFunction(res.reduce)).toBe(true);
        });
    });

    describe("getIterator", function () {
        it("should throw if iter function returns null", function () {
            expect(() => createFlow(() => null as any, () => null as any).getIterator()).toThrow();
        });

        it("should throw if iter function returns an object without an iterator", function () {
            expect(() => createFlow(() => ({}), () => null as any).getIterator()).toThrow();
        });

        it("should return proper wrapped iterator object", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter, (() => { }) as any).getIterator();
            expect(res).toBeTruthy();
            expect(res).not.toBe(fakeIter);
            expect(Array.from(res).every((x, i) => x === fakeIter[i])).toBe(true);
        });
    });

    describe("getGenerator", function () {
        it("should throw if iter function returns null", function () {
            expect(() => createFlow(() => null as any, () => null as any).getGenerator()).toThrow();
        });

        it("should throw if iter function returns an object without an iterator", function () {
            expect(() => createFlow(() => ({}), () => null as any).getGenerator()).toThrow();
        });

        it("should return proper generator object", function () {
            const fakeIter = [1, 2, 3];
            const fakeIterFunc = () => fakeIter;
            const res = createFlow(fakeIterFunc, (() => { }) as any).getGenerator();
            expect(res).toBeTruthy();
            expect(isFunction(res)).toBe(true);
            expect(res).not.toBe(fakeIterFunc);
            const iter = res();
            expect(hasOrIsIterator(iter)).toBe(true);
            expect(fakeIter).not.toBe(iter);
            expect(Array.from(iter).every((x, i) => x === fakeIter[i])).toBe(true);
        });
    });

    describe("toArray", function () {
        it("should throw if iter function returns null", function () {
            expect(() => createFlow(() => null as any, () => null as any).toArray()).toThrow();
        });

        it("should throw if iter function returns an object without an iterator", function () {
            expect(() => createFlow(() => ({}), () => null as any).toArray()).toThrow();
        });

        it("should return proper generator object", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter, (() => { }) as any).toArray();
            expect(res).toBeTruthy();
            expect(Array.isArray(res)).toBe(true);
            expect(res).not.toBe(fakeIter);
            expect(res.every((x, i) => x === fakeIter[i])).toBe(true);
        });
    });

    describe("pipe", function () {
        it("should return a new flow obj, custom piper, return proper values", function () {
            const fakeIter = [1, 2, 3];
            const newFakeIterRes = [4, 5, 6];
            const fakePiperResFunc = jest.fn().mockReturnValue(newFakeIterRes);
            const fakePiper = jest.fn().mockReturnValue(fakePiperResFunc);
            const originalFlow = createFlow(() => fakeIter, fakePiper);
            const newFlow = originalFlow.pipe(fakePiper);
            expect(originalFlow).toBeTruthy();
            expect(newFlow).toBeTruthy();
            expect(originalFlow).not.toBe(newFlow);
            const origRes = originalFlow.toArray();
            expect(origRes.every((x, i) => x === fakeIter[i])).toBe(true);
            const newRes = newFlow.toArray();
            expect(newRes.every((x, i) => x === newFakeIterRes[i])).toBe(true);
            expect(fakePiper.mock.calls.length).toBe(1);
            expect(fakePiperResFunc.mock.calls.length).toBe(1);
        });

        it("should return a new flow obj, default piper, return proper values", function () {
            const fakeIter = [1, 2, 3];
            const originalFlow = createFlow(() => fakeIter);
            const newFlow = originalFlow.pipe(function* fakeOperator(iter) {
                for (const val of iter) {
                    yield val * 2;
                }
            });
            expect(originalFlow).toBeTruthy();
            expect(newFlow).toBeTruthy();
            expect(originalFlow).not.toBe(newFlow);
            const origRes = originalFlow.toArray();
            expect(origRes.every((x, i) => x === fakeIter[i])).toBe(true);
            const newRes = newFlow.toArray();
            expect(newRes.every((x, i) => x === fakeIter[i] * 2)).toBe(true);
        });
    });

    describe("firstOrDefault", function () {
        it("should throw if iter function returns null", function () {
            expect(() => createFlow(() => null as any, () => null as any).firstOrDefault()).toThrow();
        });

        it("should throw if iter function returns an object without an iterator", function () {
            expect(() => createFlow(() => ({}), () => null as any).firstOrDefault()).toThrow();
        });

        it("should return first item", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter, (() => { }) as any).firstOrDefault();
            expect(res).toBeTruthy();
            expect(res).toBe(fakeIter[0]);
        });

        it("should return null if doesn't exist", function () {
            const fakeIter = [];
            const res = createFlow(() => fakeIter, (() => { }) as any).firstOrDefault();
            expect(res).toBe(null);
        });

        it("should return default if doesn't exist", function () {
            const fakeIter = [];
            const res = createFlow(() => fakeIter, (() => { }) as any).firstOrDefault(50 as any);
            expect(res).toBe(50);
        });
    });

    describe("find", function () {
        it("should throw if iter function returns null", function () {
            expect(() => createFlow(() => null as any, () => null as any as any).firstOrDefault()).toThrow();
        });

        it("should throw if iter function returns an object without an iterator", function () {
            expect(() => createFlow(() => ({}), () => null as any as any).firstOrDefault()).toThrow();
        });

        it("should return first matching element", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter).find((x) => x === 2);
            expect(res).toBe(2);
        });

        it("should return null if doesn't exist", function () {
            const fakeIter = [];
            const res = createFlow(() => fakeIter).find((x) => x === 2);
            expect(res).toBe(null);
        });
    });

    describe("reduce", function () {
        it("should throw if iter function returns null", function () {
            expect(() => createFlow(() => null, () => null as any).reduce(undefined as any)).toThrow();
        });

        it("should throw if iter function returns an object without an iterator", function () {
            expect(() => createFlow(() => ({}), () => null as any).reduce(undefined as any)).toThrow();
        });

        it("should throw if initial value is undefined and array is empty", function () {
            const fakeIter = [];
            expect(() => createFlow(() => fakeIter).reduce(() => { }, undefined)).toThrow(/^Reduce of empty array with no initial value$/);
        });

        it("should throw if initial value is null and array is empty", function () {
            const fakeIter = [];
            expect(() => createFlow(() => fakeIter).reduce(() => { }, null)).toThrow(/^Reduce of empty array with no initial value$/);
        });

        it("should return first element if array has one item and no inital value", function () {
            const fakeIter = [1];
            const res = createFlow(() => fakeIter).reduce((acc, x) => acc + x);
            expect(res).toBeDefined();
            expect(typeof res).toBe("number");
            expect(res).toBe(1);
        });

        it("should return elements reduced, using initial value", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter).reduce((acc, x) => acc + x, 4);
            expect(res).toBeDefined();
            expect(typeof res).toBe("number");
            expect(res).toBe(10);
        });

        it("should return elements reduced, using first value if initial value not defined", function () {
            const fakeIter = [1, 2, 3];
            const res = createFlow(() => fakeIter).reduce((acc, x) => acc + x);
            expect(res).toBeDefined();
            expect(typeof res).toBe("number");
            expect(res).toBe(6);
        });
    });
});
