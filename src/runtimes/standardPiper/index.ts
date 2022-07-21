import * as isArray from "lodash.isarray";
import * as isFunction from "lodash.isfunction";

import {
    checkIs,
    hasOrIsIterator,
} from "../../shared";

export function buildPiper(getIterFunc, ...modifiers) {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");
    checkIs("Array", isArray(modifiers), "modifiers");

    modifiers.forEach(function modifierValidator(modifier, index) {
        checkIs("Function", isFunction(modifier), `modifier[${index}]`);
    });

    return function standardPiper() {
        const initialIter = getIterFunc();
        checkIs("Iterator", hasOrIsIterator(initialIter));

        return modifiers.reduce(function reduceIterator(prevIterator, currentModifier, index) {
            checkIs("Function", isFunction(currentModifier), `modifier[${index}]`);
            const iter = currentModifier(prevIterator);
            checkIs("Iterator", hasOrIsIterator(iter), "modifier");

            return iter;
        }, initialIter);
    };
}
