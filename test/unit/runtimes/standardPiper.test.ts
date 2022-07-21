import {
    buildPiper,
} from "../../../src/runtimes/standardPiper/index";
import {
    hasOrIsIterator,
} from "../../../src/shared";

describe("standardPiper", function () {
    describe("initial validation", function () {
        it("should throw if getIterFunc does not exist", function () {
            expect(() => buildPiper(undefined as any)).toThrow();
        });

        it("should throw if getIterFunc is not a function", function () {
            expect(() => buildPiper(1)).toThrow();
        });

        it("should throw if modifiers is not an array of functions", function () {
            expect(() => buildPiper(() => { }, 1)).toThrow();
        });

        it("should not throw if modifiers is an empty array", function () {
            expect(() => buildPiper(() => { })).not.toThrow();
        });
    });

    describe("piper", function () {
        it("should throw if getIterFunc does not return an iterator", function () {
            const iterStub = jest.fn();
            const modStub1 = jest.fn();
            expect(() => buildPiper(iterStub, modStub1)()).toThrow();
            expect(iterStub.mock.calls.length).toBe(1);
            expect(modStub1.mock.calls.length).toBe(0);
        });

        it("should throw if first modifier does not return an iterator", function () {
            const iterStub = jest.fn().mockReturnValue([]);
            const modStub1 = jest.fn();
            const modStub2 = jest.fn();
            const modStub3 = jest.fn();
            expect(() => buildPiper(iterStub, modStub1, modStub2, modStub3)()).toThrow();
            expect(iterStub.mock.calls.length).toBe(1);
            expect(modStub1.mock.calls.length).toBe(1);
            expect(modStub2.mock.calls.length).toBe(0);
            expect(modStub3.mock.calls.length).toBe(0);
        });

        it("should throw if second modifier does not return an iterator", function () {
            const iterStub = jest.fn().mockReturnValue([]);
            const modStub1 = jest.fn().mockReturnValue([]);
            const modStub2 = jest.fn();
            const modStub3 = jest.fn();
            expect(() => buildPiper(iterStub, modStub1, modStub2, modStub3)()).toThrow();
            expect(iterStub.mock.calls.length).toBe(1);
            expect(modStub1.mock.calls.length).toBe(1);
            expect(modStub2.mock.calls.length).toBe(1);
            expect(modStub3.mock.calls.length).toBe(0);
        });

        it("should throw if third modifier does not return an iterator", function () {
            const iterStub = jest.fn().mockReturnValue([]);
            const modStub1 = jest.fn().mockReturnValue([]);
            const modStub2 = jest.fn().mockReturnValue([]);
            const modStub3 = jest.fn();
            expect(() => buildPiper(iterStub, modStub1, modStub2, modStub3)()).toThrow();
            expect(iterStub.mock.calls.length).toBe(1);
            expect(modStub1.mock.calls.length).toBe(1);
            expect(modStub2.mock.calls.length).toBe(1);
            expect(modStub3.mock.calls.length).toBe(1);
        });


        it("should return iterator and properly pipe sequence", function () {
            const iterStub = jest.fn().mockReturnValue([1]);
            const modStub1 = jest.fn().mockImplementation((iter) => [iter[0] * 2]);
            const modStub2 = jest.fn().mockImplementation((iter) => [iter[0] * 2]);
            const modStub3 = jest.fn().mockImplementation((iter) => [iter[0] * 2]);
            const res = buildPiper(iterStub, modStub1, modStub2, modStub3)();
            expect(iterStub.mock.calls.length).toBe(1);
            expect(modStub1.mock.calls.length).toBe(1);
            expect(modStub2.mock.calls.length).toBe(1);
            expect(modStub3.mock.calls.length).toBe(1);
            expect(hasOrIsIterator(res)).toBe(true);
            const resArr = Array.from(res);
            expect(resArr.length).toBe(1);
            expect(resArr[0]).toBe(8);
        });
    });
});
