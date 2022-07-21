import flatMap from "../../../src/operators/flatMap/index";

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
        const stub = jest.fn((x) => x);
        const res = Array.from(flatMap(stub)(boolsArr));
        expect(stub).toHaveBeenCalledTimes(5);
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === boolsResArr[i])).toBe(true);
    });

    it("should return number items, call stub", () => {
        const stub = jest.fn((x) => x);
        const res = Array.from(flatMap(stub)(numArr));
        expect(stub).toHaveBeenCalledTimes(5);
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === numResArr[i])).toBe(true);
    });
});