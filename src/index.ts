import { createAsyncFlow } from "./orchestrators/async";
import { default as fromArray } from "./sources/fromArray";
import fromAsyncIterable from "./sources/fromAsyncIterator";
import { default as fromGenerator } from "./sources/fromGenerator";
import { default as range } from "./sources/range";
import { type Flow } from "./types";

function _flow<T>(array: T[]): Flow<T> {
    return fromArray(array);
}
_flow.fromArray = fromArray;
_flow.fromIterator = fromArray;
_flow.fromGenerator = fromGenerator;
_flow.range = range;
_flow.async = fromAsyncIterable;
_flow.fromAsyncIterable = fromAsyncIterable;
_flow.fromAsyncGenerator = createAsyncFlow;
_flow.default = _flow;
Object.defineProperty(_flow, "__esModule", {
    value: true,
});
_flow.flow = _flow;

type FlowDefaultExport = typeof _flow & {
    fromArray: typeof fromArray;
    fromIterator: typeof fromArray;
    fromGenerator: typeof fromGenerator;
    range: typeof range;
    async: typeof fromAsyncIterable;
    fromAsyncIterable: typeof fromAsyncIterable;
    fromAsyncGenerator: typeof createAsyncFlow;
    default: FlowDefaultExport;
    flow: FlowDefaultExport;
};

const flow: FlowDefaultExport = _flow;
export = flow;
