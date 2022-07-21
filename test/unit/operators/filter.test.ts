import filter from "../../../src/operators/filter/index";

describe("filter", () => {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should only return boolean items that match condition", () => {
        const stub = jest.fn((x) => x);
        const res = Array.from(filter(stub)(boolsArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res).toHaveLength(4);
        expect(res.every((x) => x === true)).toBe(true);
    });

    it("should only return number items that match condition", () => {
        const stub = jest.fn((x) => x % 2 === 0);
        const res = Array.from(filter(stub)(numArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res).toHaveLength(4);
        expect(res.every((x: any) => x % 2 === 0)).toBe(true);
    });
});