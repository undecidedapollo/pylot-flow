# @pylot/flow

A collection of tools for creating lazy evaluated sequences.

[![](https://img.shields.io/github/license/undecidedapollo/pylot-flow.svg)](https://gitlab.com/pylot-node/packages/flow)
[![](https://img.shields.io/npm/v/@pylot/flow.svg)](https://www.npmjs.com/package/@pylot/flow)
[![](https://img.shields.io/bundlephobia/min/@pylot/flow.svg)](https://gitlab.com/pylot-node/packages/flow)
[![](https://img.shields.io/bundlephobia/minzip/@pylot/flow.svg)](https://gitlab.com/pylot-node/packages/flow)

## Table of Contents

- [Getting Started](#getting-started)
- [About](#about)
  - [Eager computation](#eager-computation)
  - [Imperative approach](#imperative-approach-explicit-coding)
  - [Using flow](#using-flow-declarative-coding)
  - [Interleaving Execution: Array vs Flow](#interleaving-execution-array-vs-flow)
- [Basics](#basics)
  - [Using Arrays](#using-arrays)
  - [Using Generators](#using-generators)
  - [Generating a range](#generating-a-range)
- [API](#api)
  - [Flow Object](#flow-object)
  - [Operators](#operators)
    - [Map](#map)
    - [Filter](#filter)
    - [FlatMap](#flatmap)
    - [Flat](#flat)
    - [Tap](#tap)
    - [Skip](#skip)
    - [SkipWhile](#skipwhile)
    - [Take](#take)
    - [TakeWhile](#takewhile)
    - [Bundle](#bundle)
- [License](#license)
- [Contributing](#contributing)

## Getting Started

To install the package, run the command below.

This will install the package and add a record in the dependencies object inside your package.json
```sh
npm install --save @pylot/flow
```

## About

In ES5, Javascript added useful functions for working with arrays. These operators are helpful for creating functional, reusable code. One downside of these operators is that they compute the result eagerly, sometimes wasting valuable computing resources.

### Eager computation

For example, if I wanted to get the first valid value after a set of transformations, you would have to resort to a for-loop to prevent eager evaluation and couldn't use the helpful map/filter operations without wasting compute cycles.

```typescript
//Find first number when multiplied by two that is greater than 10.

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];

//Using array methods, wastes compute cycles calculating all values when you just want the first.

const res = data.filter((num) => num * 2 > 10); //Returns arr of length 7. [6, 7, 8, 9, 10, 11, 12]
const val = res[0]; //6
```

### Imperative approach (Explicit coding)

To save on compute cycles you could use a for loop and break early. The issue is that it makes the implementation imperative (explicit) instead of declarative. You waste time writing code telling the computer what to do and how to do it, instead of focusing on the result.

```typescript
//Find first number when multiplied by two that is greater than 10.

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];

//Using array methods, wastes compute cycles calculating all values when you just want the first.

function getFirstGreaterThan10(arr) {
    for(const num of arr) {
        if(num * 2 > 10) {
            return num;
        }
    }
}


const val = getFirstGreaterThan10(data); //Returns 6
```


### Using flow (declarative coding)

Using flow provides the benefits of declarative, functional programming with the computational efficiency of using an explicit loop.

In the example below, it only has to invoke the filter function 6 times (1-6) until it finds the first valid value. Since ```firstOrDefault()``` is being used, it stops once it reaches the first valid value, saving valuable computation time.

```typescript
import flow from "@pylot/flow";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];

const res = flow(data).filter((num) => num * 2 > 10).firstOrDefault(); // Returns 6
```

### Interleaving Execution: Array vs Flow

One of the key differences between standard array methods and flow is how operations are executed. Array methods process all elements through one operation before moving to the next operation (eager evaluation), while flow processes each element through the entire pipeline before moving to the next element (lazy evaluation).

This example demonstrates the difference in execution order:

```typescript
console.log("==== ARRAY ====");
[1, 2, 3]
    .map((x) => {
        console.log("Map+1: ", x);
        return x + 1;
    })
    .filter((x) => {
        console.log("Filter: ", x);
        return x % 2 === 0;
    })
    .map((x) => {
        console.log("Map+Range: ", x);
        let subArray: number[] = [];
        for (let i = 0; i < x; i++) {
            subArray.push(i);
        }
        return [x, subArray];
    })
    .flat(2)
    .forEach((x) => {
        console.log("For Each: ", x);
    });

console.log("");
console.log("");
console.log("==== FLOW  ====");
flow([1, 2, 3])
    .map((x) => {
        console.log("Map+1: ", x);
        return x + 1;
    })
    .filter((x) => {
        console.log("Filter: ", x);
        return x % 2 === 0;
    })
    .map((x) => {
        console.log("Map+Range: ", x);
        return [x, flow.range(0, x).tap((x) => console.log("Tap: ", x))];
    })
    .flat(2)
    .forEach((x) => {
        console.log("For Each: ", x);
    });
```

Output:
```
==== ARRAY ====
Map+1:  1
Map+1:  2
Map+1:  3
Filter:  2
Filter:  3
Filter:  4
Map+Range:  2
Map+Range:  4
For Each:  2
For Each:  0
For Each:  1
For Each:  4
For Each:  0
For Each:  1
For Each:  2
For Each:  3


==== FLOW  ====
Map+1:  1
Filter:  2
Map+Range:  2
For Each:  2
Tap:  0
For Each:  0
Tap:  1
For Each:  1
Map+1:  2
Filter:  3
Map+1:  3
Filter:  4
Map+Range:  4
For Each:  4
Tap:  0
For Each:  0
Tap:  1
For Each:  1
Tap:  2
For Each:  2
Tap:  3
For Each:  3
```

Notice how:

1. **Array execution**: All elements go through the first map, then all go through filter, then all go through the second map, etc.

2. **Flow execution**: Each element goes through the entire pipeline (map → filter → map → flat → forEach) before the next element is processed.

3. **Nested flow**: The example also demonstrates how flow objects can be nested within other flow operations, with the inner flow.range() being processed on demand.

This interleaving execution pattern is particularly beneficial when:
- You only need to process a subset of the data (like with `take` or `find`)
- You're working with large datasets where processing all elements through each step would be inefficient
- You want to create complex, composable data processing pipelines

## Basics

To get started with flow, you must have an array, a generator, or create a range.
### Using Arrays

The most basic usage of flow would be using lazy evaluation for an array of values.

```typescript
import flow from "@pylot/flow";

const isEven = (num) => num % 2 === 0;

// Using direct method chaining
const newFlowObj = flow([1, 2, 3, 4, 5, 6])
  .filter(num => isEven(num))
  .map(num => num * 2);

// To get all values as an array (not recommended, evaluates all operations immediately)
const resultArray = newFlowObj.toArray();
console.log(resultArray); // Outputs: [4, 8, 12]

// To get lazy computed values on demand, use a for loop or another construct that deals with iterators
for (const val of newFlowObj) {
  // Computes the operators above on demand.
  console.log(val);
}
```

### Using Generators

To use a generator as the source:

```typescript
import flow from "@pylot/flow";

const isEven = (num) => num % 2 === 0;

/**
 Equivalent to:
function* myGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
}
*/

function* myGenerator() {
    yield* [1, 2, 3, 4, 5, 6];
}

const newFlowObj = flow.fromGenerator(myGenerator)
  .filter(num => isEven(num))
  .map((num) => num * 2);

//To get all values as an array (not recommended, evaluates all operations immediately)
const resultArray = newFlowObj.toArray();
console.log(resultArray); //Outputs: [4, 8, 12]

//To get lazy computed values on demand, use a for loop or another construct that deals with iterators
for(const val of newFlowObj) { //Computes the operators above on demand.
    console.log(val);
}
```

### Generating a range

To generate values based upon a range:

```typescript
import flow from "@pylot/flow";

const isEven = (num: number) => num % 2 === 0;

const start = 1;
const end = 7;
const step = 1;

const newFlowObj = flow
  .range(start, end, step)
  .filter((num: number) => isEven(num))
  .map((num: number) => num * 2);

//To get all values as an array (not recommended, evaluates all operations immediately)
const resultArray = newFlowObj.toArray();
console.log(resultArray); //Outputs: [4, 8, 12]

//To get lazy computed values on demand, use a for loop or another construct that deals with iterators
for(const val of newFlowObj) { //Computes the operators above on demand.
    console.log(val);
}
```

## API

### Flow Object

```typescript
// Different ways to create a flow
const flowObj = flow([1, 2, 3]); // Shorthand for flow.fromArray([1, 2, 3])
const flowObj = flow.fromArray([1, 2, 3]);
const flowObj = flow.fromGenerator(function* (){ yield* [1, 2, 3]; });
const flowObj = flow.range(1, 4, 1);

// Flow objects are iterable - can be used directly in for loops
for(const val of flowObj) {
    console.log(val);
    // 1
    // 2
    // 3
}

// getIterator() - returns an iterator, can be used in for loops or other constructs that expect iterators
for(const val of flowObj.getIterator()) {
    console.log(val);
    // 1
    // 2
    // 3
}

// getGenerator() - returns a generator. A generator is a function that when invoked returns an iterator. Can be used in constructs that expect iterators
const gen = flowObj.getGenerator();

// Invoke the generator to get an iterator. Can be invoked multiple times for multiple iterators.
for(const val of gen()) {
    console.log(val);
    // 1
    // 2
    // 3
}

//.toArray() - Returns an array of values, eagerly executes the operations.
const arr = flowObj.toArray();
for(const val of arr) {
    console.log(val);
    // 1
    // 2
    // 3
}

// .firstOrDefault() - Returns the first value in the array.
const firstVal = flowObj.firstOrDefault(); //Returns the first value in the array, null if the resulting array has no elements.
const firstVal = flowObj.firstOrDefault(123); //Returns the first value in the array, 123 if the resulting array has no elements.

// .find() - Returns the first value in the sequence that satisfies the predicate.
const firstEvenVal = flowObj.find((num) => num % 2 === 0); //Returns the first even value, undefined if it doesn't exist. 
// firstEvenVal = 2

// .forEach() - Executes a provided function once for each array element
flowObj.forEach((val) => console.log(val)); // Prints each value

//.pipe() - Creates a new flow object, used for adding a sequence of operations.
// You can still use pipe for multiple operations at once
const newFlowObj = flowObj.pipe(map((num) => num * 2), skip(3), filter((num) => num > 10));

// Or use the more fluent method chaining approach
const newFlowObj = flowObj
  .map((num) => num * 2)
  .skip(3)
  .filter((num) => num > 10);

//.reduce() - Calls a predicate on each item in the set, keeping track of an accumulator value between invocations
const sumOf1to3 = flowObj.reduce((accumulator, num) => accumulator + num); //Sums the numbers together
// sumOf1to3 = 6
const sumOf1to4 = flowObj.reduce((accumulator, num) => accumulator + num, 4); //Sums the numbers together, starting with an initial value of 4
// sumOf1to4 = 10
```

### Operators

#### Map

Transforms each element in a sequence.


```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3]).map((num) => num * 2).toArray();
// result = [2, 4, 6]
```

|Operator|Map|Type|
|---|---|---|
|Arguments|
||predicate|function(value, index) => transformedValue|
|Returns|Flow|

#### Filter

Returns set of elements that satisfy the predicate.


```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3]).filter((num) => num > 1).toArray();
// result = [2, 3]
```

|Operator|Filter|Type|
|---|---|---|
|Arguments|
||predicate|function(value, index) => boolean (true if it satisfies, false if not)|
|Returns|Flow|

#### FlatMap

Flattens result of transformation. If result is iterable, returns results in order. If result is not iterable, raw result returned.

```typescript
import flow from "@pylot/flow";

const result = flow([{arr: [1, 2, 3]}, {arr: [4, 5, 6]}, {arr: 7}])
  .flatMap((obj) => obj.arr)
  .toArray();
// result = [1, 2, 3, 4, 5, 6, 7]
```

|Operator|FlatMap|Type|
|---|---|---|
|Arguments|
||predicate|function(value, index) => newVal|
|Returns|Flow|

#### Flat

Flattens values up to a specified depth. If result is iterable, returns results in order. If result is not iterable, raw result returned.

```typescript
import flow from "@pylot/flow";

const result = flow([1, [2, [3, [4, [5, [6, [7]]]]]]]).flat(Infinity).toArray(); // Flatten infinite depth
// result = [1, 2, 3, 4, 5, 6, 7]

const result = flow([1, [2, [3, [4, [5, [6, [7]]]]]]]).flat(5).toArray(); // Flatten to a depth of 5
// result = [1, 2, 3, 4, 5, 6, [7]]

const result = flow([1, [2, [3, [4, [5, [6, [7]]]]]]]).flat().toArray(); // Default depth is 1
// result = [1, 2, [3, [4, [5, [6, [7]]]]]]
```

|Operator|Flat|Type|Default|
|---|---|---|---|
|Arguments|
||maxDepth|Integer|1|
|Returns|Flow|

#### Tap

Invokes a function for each element, does not modify sequence. This is useful for side effects like logging.


```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3])
  .tap((num) => console.log(num))
  .toArray();
// result = [1, 2, 3]
// Prints:
// 1
// 2
// 3
```

|Operator|Tap|Type|
|---|---|---|
|Arguments|
||functionToRun|function(value, index) => void|
|Returns|Flow|

#### Skip

Skips the first (numToSkip) number of elements from the sequence, returns the rest.


```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3]).skip(2).toArray();
// result = [3]
```



|Operator|Skip|Type|
|---|---|---|
|Arguments|
||numToSkip| integer/number
|Returns|Flow|

#### SkipWhile

Skips elements from the sequence until the predicate returns falsey.


```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3]).skipWhile((num) => num < 3).toArray();
// result = [3]
```



|Operator|SkipWhile|Type|
|---|---|---|
|Arguments|
||functionToRun|function(value, index) => boolean (true if you want to keep skipping, false if you want to take the rest of the sequence)|
|Returns|Flow|


#### Take

Takes the first (numToTake) number of elements from the sequence, doesn't calculate the rest.


```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3]).take(2).toArray();
// result = [1, 2]
```



|Operator|Take|Type|
|---|---|---|
|Arguments|
||numToTake| integer/number
|Returns|Flow|


#### TakeWhile

Takes elements from the sequence until the predicate returns falsey.


```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3]).takeWhile((num) => num < 3).toArray();
// result = [1, 2]
```



|Operator|TakeWhile|Type|
|---|---|---|
|Arguments|
||functionToRun|function(value, index) => boolean (true if you want to keep taking elements, false if you do not want anymore elements)|
|Returns|Flow|

#### Bundle

Groups elements into arrays of specified size.

```typescript
import flow from "@pylot/flow";

const result = flow([1, 2, 3, 4, 5]).bundle(2).toArray();
// result = [[1, 2], [3, 4], [5]]
```

|Operator|Bundle|Type|
|---|---|---|
|Arguments|
||bundleAmount|integer (must be >= 1)|
|Returns|Flow|


## License
ISC Licence

Copyright 2025 - Jonah Nestrick

## Contributing
All contributions are welcome as long as the code being added is licensed under a similar license.
