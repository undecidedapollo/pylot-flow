/* eslint-disable @typescript-eslint/naming-convention */
import { default as _fromArray } from "./sources/fromArray";
import { default as _fromGenerator } from "./sources/fromGenerator";
import { default as _range } from "./sources/range";
import { type Flow } from "./types";
/* eslint-enable @typescript-eslint/naming-convention */ export const fromArray = _fromArray;
export const fromGenerator = _fromGenerator;
export const range = _range;
function _flow<T>(array: T[]): Flow<T> {
    return fromArray(array);
}
_flow.fromArray = fromArray;
_flow.fromGenerator = fromGenerator;
_flow.range = range;

type FlowDefaultExport = typeof _flow & {
    fromArray: typeof fromArray;
    fromGenerator: typeof fromGenerator;
    range: typeof range;
};

export const flow: FlowDefaultExport = _flow;

export default flow;
