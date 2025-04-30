import { default as _fromArray } from "./sources/fromArray";
import { default as _fromGenerator } from "./sources/fromGenerator";
import { default as _range } from "./sources/range";

export const fromArray = _fromArray;
export const fromGenerator = _fromGenerator;
export const range = _range;

function flow<T>(array: T[]) {
    return fromArray(array);
}

flow.fromArray = fromArray;
flow.fromGenerator = fromGenerator;
flow.range = range;

export default flow as typeof flow | {
    fromArray: typeof fromArray;
    fromGenerator: typeof fromGenerator;
    range: typeof range;
};
