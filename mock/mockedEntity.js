module.exports = function(cls, storage) {
        cls.prototype.create = function(entity, storage) {
            storage.push(entity);
        };
        cls.prototype.read = function(id, storage) {
            return storage.find(e => e.Id == id);
        };
        cls.prototype.update = function(entity, storage) {
            let index = storage.indexOf(storage.find(e => e.Id == entity.Id));
            storage[index] = entity;

            return storage[index];
        };
        cls.prototype.delete = function(entity, storage) {
            let index = storage.indexOf(storage.find(e => e.Id == entity.Id));
            storage.splice(index, 1);
        };
};