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
                examId: 0,
                startCompiling: '2018-12-05T14:43:00.000Z',
                assignedTask: [1, 2],
                prAnswer: [
                    {
                        userId: 1,
                        taskId: 1
                    },
                ],
                points: null
            },
            {
                examId: 1,
                startCompiling: '2018-11-06T14:49:32.000Z',
                assignedTask: [0, 1],
                prAnswer: [
                    {
                        userId: 1,
                        taskId: 3
                    },
                    {
                        userId: 1,
                        taskId: 1
                    }
                ],
                points: null
            }
        ]
    },
    {
        id: 1,
        name: 'Mario',
        lastname: 'Rossi',
        username: 'mrrrss',
        email: 'mario@rossi.it',
        password: 'mario',
        exams: [
            {
                examId: 0,
                startCompiling: '2018-12-06T14:43:00.000Z',
                assignedTask: [0, 1],
                prAnswer: [
                    {
                        userId: 0,
                        taskId: 1
                    },
                ],
                points: null
            },
            {
                examId: 1,
                startCompiling: '2018-11-06T14:43:00.000Z',
                assignedTask: [1, 3],
                prAnswer: [
                    {
                        userId: 0,
                        taskId: 1
                    },
                ],
                points: null
            }
        ]
    },
    {
        id:2,
        name: 'Matteo',
        lastname: 'Bianchi',
        username: 'mttbnc',
        email: 'matteo@bianchi.it',
        password: 'matteo',
        exams: []
    },

    {
        id: 3,
        name: 'Marco',
        lastname: 'Rossi',
        username: 'mrcrss',
        email: 'marco@rossi.it',
        password: 'marco',
        exams: []
    }
    
];

module.exports = user_data;