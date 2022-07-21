import forEach from "../../../src/operators/forEach/index";

describe("forEach", () => {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items unchanged", () => {
        const stub = jest.fn((x) => !x);
        const res = Array.from(forEach(stub)(boolsArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res).toHaveLength(8);
        expect(res).toEqual(boolsArr);
    });

    it("should return number items unchanged", () => {
        const stub = jest.fn((x) => x * 2);
        const res = Array.from(forEach(stub)(numArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res).toHaveLength(8);
        expect(res).toEqual(numArr);
    });
});