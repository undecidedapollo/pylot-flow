/* eslint no-use-before-define: 0 */
export type FlowModifier<TInput = any, TOutput = any> = (interable: IterableIterator<TInput>) => Iterator<TOutput>;

export type Pipe<TInput> =
    (<TOutput>(m1: FlowModifier<TInput, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any, T2 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, T2>, m3: FlowModifier<T2, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any, T2 = any, T3 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, T2>, m3: FlowModifier<T2, T3>, m4: FlowModifier<T3, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any, T2 = any, T3 = any, T4 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, T2>, m3: FlowModifier<T2, T3>, m4: FlowModifier<T3, T4>, m5: FlowModifier<T4, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any, T2 = any, T3 = any, T4 = any, T5 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, T2>, m3: FlowModifier<T2, T3>, m4: FlowModifier<T3, T4>, m5: FlowModifier<T4, T5>, m6: FlowModifier<T5, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, T2>, m3: FlowModifier<T2, T3>, m4: FlowModifier<T3, T4>, m5: FlowModifier<T4, T5>, m6: FlowModifier<T5, T6>, m7: FlowModifier<T6, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, T2>, m3: FlowModifier<T2, T3>, m4: FlowModifier<T3, T4>, m5: FlowModifier<T4, T5>, m6: FlowModifier<T5, T6>, m7: FlowModifier<T6, T7>, m8: FlowModifier<T7, TOutput>) => Flow<TOutput>) &
    (<TOutput, T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any>(m1: FlowModifier<TInput, T1>, m2: FlowModifier<T1, T2>, m3: FlowModifier<T2, T3>, m4: FlowModifier<T3, T4>, m5: FlowModifier<T4, T5>, m6: FlowModifier<T5, T6>, m7: FlowModifier<T6, T7>, m8: FlowModifier<T7, T8>, m9: FlowModifier<T8, TOutput>) => Flow<TOutput>);


export interface Flow<T = any> {
    [Symbol.iterator](): IterableIterator<T>;
    getIterator(): IterableIterator<T>;
    getGenerator(): () => IterableIterator<T>;
    // pipe<TOutput>(m1: FlowModifier<T, TOutput>): Flow<TOutput>;
    pipe: Pipe<T>;
    toArray(): T[];
    find(predicate: (value: any, index: number, array: any[]) => boolean): T;
    firstOrDefault<U>(defaultVal?: U): T | U;
    reduce(predicate: (accumulator: any, value: any, index: number, array: any[]) => any, initialValue?: any): any;
}
