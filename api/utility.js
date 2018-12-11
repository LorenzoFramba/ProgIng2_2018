let ExamDb = require('../mock/mockedExam');

function canBeParsedInt(n) {
    return Number(n) === parseInt(n);
}

async function getExamOwner(examId) {
    try {
        let examDb = new ExamDb();
        let exam = await examDb.read({ id: examId });

        return exam === undefined ? undefined : exam.ownerId;
    }
    catch (err) {
        throw err;
    }
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
    checkUserAccessOnExam: async function(userId_answer, userId_caller, examId) {
        try {
            return userId_caller === userId_answer || userId_caller === await getExamOwner(examId);
        }
        catch (err) {
            throw err;
        }
    },
    getExamOwner: getExamOwner
}
