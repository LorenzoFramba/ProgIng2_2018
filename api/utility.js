module.exports = {
    checkParamsUndefined: function(...params) {
        return params.some(p => p === undefined);
    }
}