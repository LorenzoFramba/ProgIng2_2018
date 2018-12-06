module.exports = {
    abstractCheck: function(cls) {
        if (new.target === cls) {
            throw new TypeError(`Cannot Instantiate abstract class ${cls.name}`);
        }
    }
}