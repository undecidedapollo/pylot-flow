const fromArray = require("./fromArray");
const fromGenerator = require("./fromGenerator");
const range = require("./range");

module.exports = {
    ...fromArray,
    ...fromGenerator,
    ...range,
};
