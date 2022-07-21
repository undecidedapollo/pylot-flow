import map from "../../../src/operators/map";

describe("map", () => {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items inverted", () => {
        const stub = jest.fn((x) => !x);
        const res = Array.from(map(stub)(boolsArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === !boolsArr[i])).toBe(true);
    });

    it("should return number items multiplied by two", () => {
        const stub = jest.fn((x) => x * 2);
        const res = Array.from(map(stub)(numArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res.length).toBe(8);
        expect(res.every((x, i) => x === numArr[i] * 2)).toBe(true);
    });
});