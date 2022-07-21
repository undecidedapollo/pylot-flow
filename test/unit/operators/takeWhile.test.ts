import takeWhile from "../../../src/operators/takeWhile/index";

describe("takeWHile", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should only return boolean items until condition is false", function () {
        const stub = jest.fn()
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);
        const res = Array.from(takeWhile(stub)(boolsArr));
        expect(stub.mock.calls.length).toBe(5);
        expect(res.length).toBe(4);
        expect(res.every((x, i) => x === boolsArr[i])).toBe(true);
    });

    it("should only return number items until condition is false", function () {
        const stub = jest.fn()
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);
        const res = Array.from(takeWhile(stub)(numArr));
        expect(stub.mock.calls.length).toBe(5);
        expect(res.length).toBe(4);
        expect(res.every((x, i) => x === numArr[i])).toBe(true);
    });
});