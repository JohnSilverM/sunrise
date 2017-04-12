var pify    = require('pify');
var Promise = require('pinkie');

module.exports = function (fn) {
    return pify(fn, Promise);
};
