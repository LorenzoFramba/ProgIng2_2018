const errorMsg = require('./error');

module.exports = function(cls, cls_model, storage) {
    let _this = this;

    function checkEntityPrototype(entity) {
        return entity instanceof cls_model;
    };

    function castObjectToEntity(obj) {
        let entity = Object.create(cls_model.prototype);
        return Object.assign(entity, obj);
    };

    function compareOnId(e1, e2) {
        for (let prop of _this.__ids__) {
            if (e1[prop] !== e2[prop])
                return false;
        }
        return true;
    }

    function generateNewId(entity) {
        let composedIds = _this.__ids__.filter(id => id !== 'id');
        if (composedIds.length === _this.__ids__.length)
            return undefined;

        let getNewMax = (store) => {
            let local_max = Math.max(...store.map(e => e.id)) + 1;
            return local_max === -Infinity ? 0 : local_max;
        }
        
        if (composedIds.length === 0)
            return getNewMax(storage);

        let tempStorage = storage.filter(e => e[composedIds[0]] === entity[composedIds[0]]);

        composedIds = composedIds.slice(1);
        composedIds.forEach(id => {
            tempstorage = tempStorage.concat(storage.filter(e => e[id] === entity[id]));
        });

        return getNewMax(tempStorage);
    }

    cls.prototype.create = function(entity) {
        return new Promise((resolve, reject) => {
            if (!checkEntityPrototype(entity))
                reject(errorMsg.MODEL_INVALID);
            let newId = generateNewId(entity);

            if (newId === undefined) {
                let objId = _this.__ids__.reduce((acc, cur) => {
                    acc[cur] = entity[cur];
                    return acc;
                }, {});
                let dupl = storage.find(e => compareOnId(e, objId));

                if (dupl !== undefined)
                    reject(errorMsg.DUPLICATE_ENTITY);
            }
            else
                entity.id = newId;

            storage.push(entity);
            resolve();
        });
    };

    // id must be of the form: { id: x, examId: y }
    cls.prototype.read = (id) => {
        return new Promise((resolve, reject) => {
            let objFound = storage.find(e => compareOnId(e, id));
            if (objFound === undefined)
                resolve(undefined);

            let entity = castObjectToEntity(objFound);
            resolve(entity);
        });
    };

    cls.prototype.update = function(entity) {
        return new Promise((resolve, reject) => {
            if (!checkEntityPrototype(entity))
                reject(errorMsg.MODEL_INVALID); 
            let index = storage.findIndex(e => compareOnId(e, entity));
            if (index === -1)
                reject(errorMsg.ENTITY_NOT_FOUND);

            storage[index] = entity;

            resolve();
        });
    };

    cls.prototype.delete = function(id) {
        return new Promise((resolve, reject) => {
            let index = storage.findIndex(e => compareOnId(e, id));
            if (index === -1)
                reject(errorMsg.ENTITY_NOT_FOUND);

            storage.splice(index, 1);
            resolve();
        });
    };
};