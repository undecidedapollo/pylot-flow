export interface Flow<T> {
    [Symbol.iterator]: () => Generator<T, void, void>;
    getIterator(): Iterable<T>;
    getGenerator(): () => Generator<T, void, void>;
    pipe: FlowPipe<T>;
    toArray(): T[];
    find(predicate: (val: T) => boolean): T | null;
    firstOrDefault(defaultVal?: T | null): T | null;
    reduce: Reduce<T>;
    bundle(bundleAmount: number): Flow<T[]>;
    filter(predicate: (val: T, idx: number) => boolean): Flow<T>;
    flatMap<TResponse>(predicate: (val: T) => Iterable<TResponse | ReadonlyArray<TResponse>>): Flow<TResponse>;
    flatten(): Flow<Flatten<T>>;
    forEach(predicate: (val: T, idx: number) => void): Flow<T>;
    map<TResponse>(predicate: (val: T, idx: number) => TResponse): Flow<TResponse>;
    skip(count: number): Flow<T>;
    skipWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
    take(count: number): Flow<T>;
    takeWhile(predicate: (val: T, idx: number) => boolean): Flow<T>;
}

export type FlatMapPredicate<T, TResponse> = (val: T, idx: number) => Iterable<TResponse | ReadonlyArray<TResponse>>;

type Reduce<T> = {
    (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    (callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    <U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
};

type Flatten<TSource> =
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

type FlowPipe<TSource> = {
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
