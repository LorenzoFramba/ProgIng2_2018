//Contenuto del DB nel documento user
let user_data = [
    { 
        id: 0,
        name: 'Gino',
        lastname: 'Pino',
        email: 'gino@pino.it',
        password: 'ciccio',
        exams: [
            {
                id : 0,
                startCompiling : 12345,
                assignedTasks : [1,2,3,4,5],
                points : 25
            }
        ]
    },
    {
        id: 1,
        name: 'Mario',
        lastname: 'Rossi',
        email: 'mario@rossi.it',
        password: 'mario',
        exams: []
    },

    {
        id:2,
        name: 'Matteo',
        lastname: 'Bianchi',
        email: 'matteo@bianchi.it',
        password: 'matteo',
        exams: []
    },

    {
        id: 3,
        name: 'Marco',
        lastname: 'Rossi',
        email: 'marco@rossi.it',
        password: 'marco',
        exams: [
            {
                id : 0,
                startCompiling : 12345,
                assignedTasks : [1,2,3,4,5],
                points : 25
            }
        ]
    },
    {
        id: 4,
        name: 'Luca',
        lastname: 'Bianchi',
        email: 'luca@biachi.it',
        password: 'luca',
        exams: []
    }
    
];

module.exports = user_data;