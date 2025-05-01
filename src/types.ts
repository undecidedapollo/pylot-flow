export interface Flow<T> {
    [Symbol.iterator]: () => Generator<T, void, void>;
    getIterator(): Iterable<T>;
    getGenerator(): () => Generator<T, void, void>;
    pipe: FlowPipe<T>;
    toArray(): T[];
    find(predicate: (val: T) => boolean): T | null;
    firstOrDefault(defaultVal?: T | null): T | null;
    forEach(predicate: (val: T, idx: number) => void): void;
    reduce: Reduce<T>;
    bundle(bundleAmount: number): Flow<T[]>;
    filter(predicate: (val: T, idx: number) => boolean): Flow<T>;
    flatMap<TResponse>(predicate: FlatMapPredicate<T, TResponse>): Flow<TResponse>;
    flat(maxDepth?: number): Flow<Flatten<T>>;
    map<TResponse>(predicate: (val: T, idx: number) => TResponse): Flow<TResponse>;
    skip(count: number): Flow<T>;
    skipWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
    take(count: number): Flow<T>;
    takeWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
    tap(predicate: (val: T, idx: number) => void): Flow<T>;
}

export interface InternalAsyncFlow<T> {
    [Symbol.asyncIterator]: () => AsyncGenerator<T, void, void>;
    getIterator(): AsyncIterable<T>;
    getGenerator(): () => AsyncGenerator<T, void, void>;
    pipe: AsyncFlowPipe<T>;
    toArray(): Promise<T[]>;
    find(predicate: (val: T) => Promise<boolean> | boolean): Promise<T | null>;
    firstOrDefault(defaultVal?: T | null): Promise<T | null>;
    forEach(predicate: (val: T, idx: number) => void): void;
    reduce: AsyncReduce<T>;
    // bundle(bundleAmount: number): Flow<T[]>;
    filter(predicate: (val: T, idx: number) => boolean): AsyncFlow<T>;
    flatMap<TResponse>(predicate: AsyncFlatMapPredicate<T, TResponse>): AsyncFlow<TResponse>;
    // flat(maxDepth?: number): Flow<Flatten<T>>;
    map<TResponse>(predicate: (val: T, idx: number) => TResponse): AsyncFlow<TResponse>;
    splitMerge(delimiter: string): AsyncFlow<string>;
    pipeToWritable(writable: WritableLike): Promise<void>;
    // skip(count: number): Flow<T>;
    // skipWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
    // take(count: number): Flow<T>;
    // takeWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
    // tap(predicate: (val: T, idx: number) => void): Flow<T>;
}

export interface WritableLike {
    write(chunk: string): boolean;
    end(): void;
    on(event: "drain", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    removeListener(event: "drain", listener: () => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
}

export interface BaseAsyncFlow<T> {
    [Symbol.asyncIterator]: () => AsyncGenerator<T, void, void>;
    getIterator(): AsyncIterable<T>;
    getGenerator(): () => AsyncGenerator<T, void, void>;
    pipe: AsyncFlowPipe<T>;
    toArray(): Promise<T[]>;
    find(predicate: (val: T) => Promise<boolean> | boolean): Promise<T | null>;
    firstOrDefault(defaultVal?: T | null): Promise<T | null>;
    forEach(predicate: (val: T, idx: number) => void): void;
    reduce: AsyncReduce<T>;
    // bundle(bundleAmount: number): Flow<T[]>;
    filter(predicate: (val: T, idx: number) => boolean): AsyncFlow<T>;
    flatMap<TResponse>(predicate: AsyncFlatMapPredicate<T, TResponse>): AsyncFlow<TResponse>;
    // flat(maxDepth?: number): Flow<Flatten<T>>;
    map<TResponse>(predicate: (val: T, idx: number) => TResponse): AsyncFlow<TResponse>;
    // skip(count: number): Flow<T>;
    // skipWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
    // take(count: number): Flow<T>;
    // takeWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
    // tap(predicate: (val: T, idx: number) => void): Flow<T>;
}

export interface StringOnlyMethods {
    splitMerge(delimiter: string): AsyncFlow<string>;
    pipeToWritable(writable: WritableLike): Promise<void>;
}

export type AsyncFlow<T> = BaseAsyncFlow<T> & (T extends string ? StringOnlyMethods : void);

export type AsyncCompatIter<T> = AsyncIterable<T> | Iterable<T>;
export type PromiseOrValue<T> = Promise<T> | T;

export type FlatMapPredicate<T, TResponse> = (val: T, idx: number) => Iterable<TResponse | ReadonlyArray<TResponse>>;
export type AsyncFlatMapPredicate<T, TResponse> = (
    val: T,
    idx: number,
) => PromiseOrValue<AsyncCompatIter<TResponse | ReadonlyArray<TResponse>>>;

type Reduce<T> = {
    (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): Promise<T>;
    (
        callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T,
        initialValue: T,
    ): Promise<T>;
    <U>(
        callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
        initialValue: U,
    ): Promise<U>;
};

type AsyncReduce<T> = {
    (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => Promise<T> | T): T;
    (
        callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => Promise<T> | T,
        initialValue: T,
    ): T;
    <U>(
        callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => Promise<U> | U,
        initialValue: U,
    ): U;
};

export type Flatten<TSource> =
    | (TSource extends Iterable<infer U>
          ? U extends Iterable<infer V>
              ? V extends Iterable<infer W>
                  ? W extends Iterable<infer X>
                      ? X extends Iterable<infer Y>
                          ? Y extends Iterable<infer Z>
                              ? Z
                              : Y
                          : X
                      : W
                  : V
              : U
          : TSource)
    | TSource;

export type FlowPipe<TSource> = {
    <B>(fn1: (src: Iterable<TSource>) => Generator<B>): Flow<B>;
    <B, C>(fn1: (src: Iterable<TSource>) => Generator<B>, fn2: (src: Iterable<B>) => Generator<C>): Flow<C>;
    <B, C, D>(
        fn1: (src: Iterable<TSource>) => Generator<B>,
        fn2: (src: Iterable<B>) => Generator<C>,
        fn3: (src: Iterable<C>) => Generator<D>,
    ): Flow<D>;
    <B, C, D, E>(
        fn1: (src: Iterable<TSource>) => Generator<B>,
        fn2: (src: Iterable<B>) => Generator<C>,
        fn3: (src: Iterable<C>) => Generator<D>,
        fn4: (src: Iterable<D>) => Generator<E>,
    ): Flow<E>;
    <B, C, D, E, F>(
        fn1: (src: Iterable<TSource>) => Generator<B>,
        fn2: (src: Iterable<B>) => Generator<C>,
        fn3: (src: Iterable<C>) => Generator<D>,
        fn4: (src: Iterable<D>) => Generator<E>,
        fn5: (src: Iterable<E>) => Generator<F>,
    ): Flow<F>;
    <B, C, D, E, F, G>(
        fn1: (src: Iterable<TSource>) => Generator<B>,
        fn2: (src: Iterable<B>) => Generator<C>,
        fn3: (src: Iterable<C>) => Generator<D>,
        fn4: (src: Iterable<D>) => Generator<E>,
        fn5: (src: Iterable<E>) => Generator<F>,
        fn6: (src: Iterable<F>) => Generator<G>,
    ): Flow<G>;
    <B, C, D, E, F, G, H>(
        fn1: (src: Iterable<TSource>) => Generator<B>,
        fn2: (src: Iterable<B>) => Generator<C>,
        fn3: (src: Iterable<C>) => Generator<D>,
        fn4: (src: Iterable<D>) => Generator<E>,
        fn5: (src: Iterable<E>) => Generator<F>,
        fn6: (src: Iterable<F>) => Generator<G>,
        fn7: (src: Iterable<G>) => Generator<H>,
    ): Flow<H>;
    <B, C, D, E, F, G, H, I>(
        fn1: (src: Iterable<TSource>) => Generator<B>,
        fn2: (src: Iterable<B>) => Generator<C>,
        fn3: (src: Iterable<C>) => Generator<D>,
        fn4: (src: Iterable<D>) => Generator<E>,
        fn5: (src: Iterable<E>) => Generator<F>,
        fn6: (src: Iterable<F>) => Generator<G>,
        fn7: (src: Iterable<G>) => Generator<H>,
        fn8: (src: Iterable<H>) => Generator<I>,
    ): Flow<I>;
};

export type AsyncFlowPipe<TSource> = {
    <B>(fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>): AsyncFlow<B>;
    <B, C>(
        fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>,
        fn2: (src: Iterable<B>) => AsyncGenerator<C>,
    ): AsyncFlow<C>;
    <B, C, D>(
        fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>,
        fn2: (src: Iterable<B>) => AsyncGenerator<C>,
        fn3: (src: Iterable<C>) => AsyncGenerator<D>,
    ): AsyncFlow<D>;
    <B, C, D, E>(
        fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>,
        fn2: (src: Iterable<B>) => AsyncGenerator<C>,
        fn3: (src: Iterable<C>) => AsyncGenerator<D>,
        fn4: (src: Iterable<D>) => AsyncGenerator<E>,
    ): AsyncFlow<E>;
    <B, C, D, E, F>(
        fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>,
        fn2: (src: Iterable<B>) => AsyncGenerator<C>,
        fn3: (src: Iterable<C>) => AsyncGenerator<D>,
        fn4: (src: Iterable<D>) => AsyncGenerator<E>,
        fn5: (src: Iterable<E>) => AsyncGenerator<F>,
    ): AsyncFlow<F>;
    <B, C, D, E, F, G>(
        fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>,
        fn2: (src: Iterable<B>) => AsyncGenerator<C>,
        fn3: (src: Iterable<C>) => AsyncGenerator<D>,
        fn4: (src: Iterable<D>) => AsyncGenerator<E>,
        fn5: (src: Iterable<E>) => AsyncGenerator<F>,
        fn6: (src: Iterable<F>) => AsyncGenerator<G>,
    ): AsyncFlow<G>;
    <B, C, D, E, F, G, H>(
        fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>,
        fn2: (src: Iterable<B>) => AsyncGenerator<C>,
        fn3: (src: Iterable<C>) => AsyncGenerator<D>,
        fn4: (src: Iterable<D>) => AsyncGenerator<E>,
        fn5: (src: Iterable<E>) => AsyncGenerator<F>,
        fn6: (src: Iterable<F>) => AsyncGenerator<G>,
        fn7: (src: Iterable<G>) => AsyncGenerator<H>,
    ): AsyncFlow<H>;
    <B, C, D, E, F, G, H, I>(
        fn1: (src: AsyncIterable<TSource> | Iterable<TSource>) => AsyncGenerator<B, void, void>,
        fn2: (src: Iterable<B>) => AsyncGenerator<C>,
        fn3: (src: Iterable<C>) => AsyncGenerator<D>,
        fn4: (src: Iterable<D>) => AsyncGenerator<E>,
        fn5: (src: Iterable<E>) => AsyncGenerator<F>,
        fn6: (src: Iterable<F>) => AsyncGenerator<G>,
        fn7: (src: Iterable<G>) => AsyncGenerator<H>,
        fn8: (src: Iterable<H>) => AsyncGenerator<I>,
    ): AsyncFlow<I>;
};
