# @pylot/flow

A collection of tools for creating lazy evaluated sequences.

[![](https://img.shields.io/github/license/undecidedapollo/pylot-flow.svg)](https://gitlab.com/pylot-node/packages/flow)
[![](https://img.shields.io/npm/v/@pylot/flow.svg)](https://www.npmjs.com/package/@pylot/flow)
[![coverage report](https://gitlab.com/pylot-node/packages/flow/badges/master/coverage.svg?job=test:node10)](https://gitlab.com/pylot-node/packages/flow/commits/master)
[![](https://img.shields.io/david/undecidedapollo/pylot-flow.svg)](https://gitlab.com/pylot-node/packages/flow)
[![build](https://gitlab.com/pylot-node/packages/flow/badges/master/build.svg)](https://gitlab.com/pylot-node/packages/flow)
[![](https://img.shields.io/bundlephobia/min/@pylot/flow.svg)](https://gitlab.com/pylot-node/packages/flow)
[![](https://img.shields.io/bundlephobia/minzip/@pylot/flow.svg)](https://gitlab.com/pylot-node/packages/flow)

## Getting Started

To install the package, run the command below.

This will install the package and add a record in the dependecies object inside your package.json
```sh
npm install --save @pylot/flow
```

## About

In ES5, Javascript added useful functions for working with arrays. These operators are helpful for creating functional, reusable code. One downside of these operators is that they compute the result eagerly, sometimes wasting valuable computing resources.

### Eager computation

For example, if I wanted to get the first valid value after a set of transformations, you would have to resort to a for-loop to prevent eager evaluation and couldn't use the helpful map/filter operations without wasting compute cycles.

```javascript
//Find first number when multiplied by two that is greater than 10.

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];

//Using array methods, wastes compute cycles calculating all values when you just want the first.

const res = data.filter((num) => num * 2 > 10); //Returns arr of length 7. [6, 7, 8, 9, 10, 11, 12]
const val = res[0]; //6
```

### Imperative approach (Explicit coding)

To save on compute cycles you could use a for loop and break early. The issue is that it makes the implementation imperative (explicit) instead of declarative. You waste time writing code telling the computer what to do and how to do it, instead of focusing on the result.

```javascript
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

```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import operators
const filter = require("@pylot/flow/operators/filter");

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12];

const res = flow.fromArray(data).pipe(filter((num) => num * 2 > 10)).firstOrDefault(); // Returns 6
```

## Basics

To get started with flow, you must have an array, a generator, or create a range.
### Using Arrays

The most basic usage of flow would be using lazy evaluation for an array of values.

```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import operators
const map = require("@pylot/flow/operators/map");
const filter = require("@pylot/flow/operators/filter");

const isEven = (num) => num % 2 === 0;

const newFlowObj = flow.fromArray([1, 2, 3, 4, 5, 6]).pipe(filter(num => isEven(num)), map((num) => num * 2));

//To get all values as an array (not recommended, evaluates all operations immediately)
const resultArray = newFlowObj.toArray();
console.log(resultArray); //Outputs: [4, 8, 12]

//To get lazy computed values on demand, use a for loop or another construct that deals with iterators
for(const val of newFlowObj.getIterator()) { //Computes the operators above on demand.
    console.log(resultArray);
}
```

### Using Generators

The use a generator as the source.

```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import operators
const map = require("@pylot/flow/operators/map");
const filter = require("@pylot/flow/operators/filter");

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

const newFlowObj = flow.fromGenerator(myGenerator).pipe(filter(num => isEven(num)), map((num) => num * 2));

//To get all values as an array (not recommended, evaluates all operations immediately)
const resultArray = newFlowObj.toArray();
console.log(resultArray); //Outputs: [4, 8, 12]

//To get lazy computed values on demand, use a for loop or another construct that deals with iterators
for(const val of newFlowObj.getIterator()) { //Computes the operators above on demand.
    console.log(resultArray);
}
```

### Generating a range

To generate values based upon a range.

```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import operators
const map = require("@pylot/flow/operators/map");
const filter = require("@pylot/flow/operators/filter");

const isEven = (num) => num % 2 === 0;

const start = 1; //Inclusive
const end = 7; //Exclusive
const step = 1;


const newFlowObj = flow.range(start, end, step).pipe(filter(num => isEven(num)), map((num) => num * 2));

//To get all values as an array (not recommended, evaluates all operations immediately)
const resultArray = newFlowObj.toArray();
console.log(resultArray); //Outputs: [4, 8, 12]

//To get lazy computed values on demand, use a for loop or another construct that deals with iterators
for(const val of newFlowObj.getIterator()) { //Computes the operators above on demand.
    console.log(resultArray);
}
```

## API

### Flow Object

```javascript
const flowObj = flow.fromArray([1, 2, 3]); //Equivalent
const flowObj = flow.fromGenerator(function* (){ yield* [1, 2, 3]; }); //Equivalent
const flowObj = flow.fromRange(1, 4, 1); //Equivalent

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

//.pipe() - Creates a new flow object, used for adding a sequence of operations.
const newFlowObj = flowObj.pipe(map((num) => num * 2), skip(3), filter((num) => num > 10));

const results = newFlowObj.toArray();

```

### Operators

#### Map

Transforms each element in a sequence.


```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import map operator
const map = require("@pylot/flow/operators/map");

const result = flow.fromArray([1, 2, 3]).pipe(map((num) => num * 2)).toArray();
// result = [4, 5, 6]
```

|Operator|Map|Type|
|---|---|---|
|Arguments|
||predicate|function(value, index) => transformedValue|
|Returns|FLOW_OPERATOR|

#### Filter

Returns set of elements that satisfy the predicate.


```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import filter operator
const filter = require("@pylot/flow/operators/filter");

const result = flow.fromArray([1, 2, 3]).pipe(filter((num) => num > 1)).toArray();
// result = [2, 3]
```

|Operator|Filter|Type|
|---|---|---|
|Arguments|
||predicate|function(value, index) => boolean (true is satisfies, false if not)|
|Returns|FLOW_OPERATOR|

#### FlatMap

Flattens result of transformation. If result is iterable, returns results in order. If result is not iterable, raw result returned.

```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import flatMap operator
const flatMap = require("@pylot/flow/operators/flatMap");

const result = flow.fromArray({arr: [1, 2, 3]}, {arr: [4, 5, 6]}, {arr: 7}).pipe(flatMap((obj) => obj.arr)).toArray();
// result = [1, 2, 3, 4, 5, 6, 7]
```

|Operator|FlatMap|Type|
|---|---|---|
|Arguments|
||predicate|function(value, index) => newVal|
|Returns|FLOW_OPERATOR|

#### Flatten

Flattens values up to a specified depth. If result is iterable, returns results in order. If result is not iterable, raw result returned.

```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import flatten operator
const flatten = require("@pylot/flow/operators/flatten");

const result = flow.fromArray([1, [2, [3, [4, [5, [6, [7]]]]]]]).pipe(flatten()).toArray(); //Flatten infinite depth
// result = [1, 2, 3, 4, 5, 6, 7]

const result = flow.fromArray([1, [2, [3, [4, [5, [6, [7]]]]]]]).pipe(flatten(5)).toArray(); //Flatten to a depth of 5
// result = [1, 2, 3, 4, 5, 6, [7]]
```

|Operator|Flatten|Type|Default|
|---|---|---|---|
|Arguments|
||maxDepth|Integer|Number.POSITIVE_INFINITY|
|Returns|FLOW_OPERATOR|

#### ForEach

Invokes a function for each element, does not modify sequence.


```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import forEach operator
const forEach = require("@pylot/flow/operators/forEach");

const result = flow.fromArray([1, 2, 3]).pipe(forEach((num) => console.log(num))).toArray();
// result = [1, 2, 3]
// Prints:
// 1
// 2
// 3
```

|Operator|ForEach|Type|
|---|---|---|
|Arguments|
||functionToRun|function(value, index) => void|
|Returns|FLOW_OPERATOR|

#### Skip

Skips the first (numToSkip) number of elements from the sequence, returns the rest.


```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import skip operator
const skip = require("@pylot/flow/operators/skip");

const result = flow.fromArray([1, 2, 3]).pipe(skip(2)).toArray();
// result = [3]
```



|Operator|Skip|Type|
|---|---|---|
|Arguments|
||numToSkip| integer/number
|Returns|FLOW_OPERATOR|

#### Take

Takes the first (numToTake) number of elements from the sequence, doesn't calculate the rest.


```javascript
//Import flow library
const flow = require("@pylot/flow");
//Import take operator
const take = require("@pylot/flow/operators/take");

const result = flow.fromArray([1, 2, 3]).pipe(take(2)).toArray();
// result = [1, 2]
```



|Operator|Take|Type|
|---|---|---|
|Arguments|
||numToTake| integer/number
|Returns|FLOW_OPERATOR|


## License
ISC Licence

Copyright 2019 - Jonah Nestrick

## Contributing
All contributions are welcome as long as the code being added is licensed under a similar license.
