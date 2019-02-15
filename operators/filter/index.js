/**
 * Filters items based upon a predicate. Keeps items when predicate returns truthy values, filters items when predicate returns falsy values.
 * @param {function(Object, index:number)} predicate A function taking parameters value, index and returning a truthy/falsy value. Value being the current item, index being the index of the current item in the sequence.
 * @returns {Generator} Flow filter operator
 */
function filter(predicate) {
    return function* filterGenerator(iterator) {
        let index = 0;
        for (const val of iterator) {
            const res = predicate(val, index);
            index += 1;
            if (res) {
                yield val;
            }
        }
    };
}

module.exports = filter;
