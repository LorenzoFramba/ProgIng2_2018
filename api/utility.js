function canBeParsedInt(n) {
    return Number(n) === parseInt(n);
}

module.exports = {
    validateParamsUndefined: function(...params) {
        return params.some(p => p === undefined);
    },
    validateParamsNumber: function(...params) {
        return !params.some(p => typeof(p) !== 'number' || isNaN(p));
    },
    validateParamsString : function(...params) {
        return !params.some(p => typeof(p) !== 'string');
    },
    castToInt: function(value) {
        return canBeParsedInt(value) ? parseInt(value) : undefined;
    }
}