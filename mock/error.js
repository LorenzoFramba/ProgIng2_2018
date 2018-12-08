module.exports = {
    MODEL_INVALID: {
        code: 'M0001',
        message: `entity is not an instance of specified class model`,
    },
    ENTITY_NOT_FOUND: {
        code: 'M0002',
        message: `entity has not been found inside db`
    },
    DUPLICATE_ENTITY: {
        code: 'M0003',
        message: `the entity you are trying to create is already present inside db`
    }
};