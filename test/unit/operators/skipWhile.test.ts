import { jest } from "@jest/globals";
import skipWhile from "#operators/skipWhile/index.js";

describe("skipWhile", function () {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should only return boolean items until condition is false", function () {
        const stub = jest.fn<(val: unknown, index: number) => boolean>()
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);
        const res = Array.from(skipWhile(stub)(boolsArr));
        expect(stub.mock.calls.length).toBe(5);
        expect(res.length).toBe(4);
        expect(res.every((x, i) => x === boolsArr[i + 4])).toBe(true);
    });

    it("should only return number items until condition is false", function () {
        const stub = jest.fn<(val: unknown, index: number) => boolean>()
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false);
        const res = Array.from(skipWhile(stub)(numArr));
        expect(stub.mock.calls.length).toBe(5);
        expect(res.length).toBe(4);
        expect(res.every((x, i) => x === numArr[i + 4])).toBe(true);
    });
});