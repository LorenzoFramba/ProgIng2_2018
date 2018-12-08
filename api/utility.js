module.exports = {
    validateParamsUndefined: function(...params) {
        return params.some(p => p === undefined);
    },
    validateParamsNumber: function(...params) {
        return !params.some(p => typeof(p) !== 'number');
    }
}