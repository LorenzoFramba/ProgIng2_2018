const errors = require('./error');

module.exports = {
    abstractCheck: function(cls, target) {
        if (target === cls) {
            throw new TypeError(errors.CANNOT_INSTANCE_ABSTRACT);
        }
    }
}