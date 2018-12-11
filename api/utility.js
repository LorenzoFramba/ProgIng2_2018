const ExamDb = require('../mock/mockedExam');

function canBeParsedInt(n) {
    return Number(n) === parseInt(n);
}

module.exports = {
    //Ritorna true se c'è almeno un parametro undefined
    validateParamsUndefined: function(...params) {
        return params.some(p => p === undefined);
    },
    //Ritorna true se tutti i parametri sono numeri
    validateParamsNumber: function(...params) {
        return !params.some(p => typeof(p) !== 'number' || isNaN(p));
    },
    //Ritorna true se tutti i parametri sono stringhe
    validateParamsString : function(...params) {
        return !params.some(p => typeof(p) !== 'string');
    },
    castToInt: function(value) {
        return canBeParsedInt(value) ? parseInt(value) : undefined;
    },
    getExamOwner: async function (examId) {
        try {
            let examDb = new ExamDb();
            let exam = await examDb.read({ id: examId });
    
            if (exam === undefined)
                return undefined;
            else
                return exam.ownerId;
        }
        catch (err) {
            throw err;
        }
    }
}