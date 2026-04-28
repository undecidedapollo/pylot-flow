import { jest } from "@jest/globals";
import flatMap from "#operators/flatMap/index.js";
import type { FlatMapPredicate } from "#types.js";

describe("flatMap", () => {
    const boolsArr = [[true, false, true], false, [true, true], false, false];
    const boolsResArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, [2, 3], 4, [5, 6, 7], 8];
    const numResArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items", () => {
        const res = Array.from(flatMap()(boolsArr));
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === boolsResArr[i])).toBe(true);
    });

    it("should return number items", () => {
        const res = Array.from(flatMap()(numArr));
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === numResArr[i])).toBe(true);
    });

    it("should return boolean items, call stub", () => {
        const stub = jest.fn((x: boolean | boolean[]) => x);
        const res = Array.from(flatMap(stub as unknown as FlatMapPredicate<boolean | boolean[], boolean>)(boolsArr));
        expect(stub).toHaveBeenCalledTimes(5);
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === boolsResArr[i])).toBe(true);
    });

    it("should return number items, call stub", () => {
        const stub = jest.fn((x: number | number[]) => x);
        const res = Array.from(flatMap(stub as unknown as FlatMapPredicate<number | number[], number>)(numArr));
        expect(stub).toHaveBeenCalledTimes(5);
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === numResArr[i])).toBe(true);
    });
});