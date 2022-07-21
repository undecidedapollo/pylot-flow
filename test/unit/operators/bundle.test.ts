import bundle from "../../../src/operators/bundle/index";

describe("bundle", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should only return boolean items that match condition", function () {
        const res = Array.from(bundle(2)(boolsArr));
        expect(res.length).toBe(4);
        expect(res.every((x, i1) => x.every((y, i2) => y === boolsArr[(i1 * 2) + i2]))).toBe(true);
    });

    it("% === 0, should only return number items that match condition", function () {
        const res = Array.from(bundle(4)(numArr));
        expect(res.length).toBe(2);
        expect(res.every((x, i1) => x.every((y, i2) => y === numArr[(i1 * 4) + i2]))).toBe(true);
    });

    it("% !== 0, should only return number items that match condition", function () {
        const res = Array.from(bundle(3)(numArr));
        expect(res.length).toBe(3);
        expect(res.every((x, i1) => x.every((y, i2) => y === numArr[(i1 * 3) + i2]))).toBe(true);
    });
});