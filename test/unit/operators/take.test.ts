import take from "../../../src/operators/take";

describe("take", () => {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items unchanged", () => {
        const res = Array.from(take(4)(boolsArr));
        expect(res.length).toBe(4);
        expect(res.every((x, i) => x === boolsArr[i])).toBe(true);
    });

    it("should return number items unchanged", () => {
        const res = Array.from(take(4)(numArr));
        expect(res.length).toBe(4);
        expect(res.every((x, i) => x === numArr[i])).toBe(true);
    });

    it("should return empty iter when take = 0", () => {
        const res = Array.from(take(0)(numArr));
        expect(res.length).toBe(0);
        expect(res.every((x, i) => x === numArr[i])).toBe(true);
    });
});
