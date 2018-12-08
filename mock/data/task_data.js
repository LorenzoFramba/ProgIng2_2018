let task_data = [
    {
        'id': 0,
        'examId': 0,
        'text': '2 + 2',
        'options': ['3', '4', '5'],
        'score': 5,
        'isPeerReview': false,
        'category': 'radio',
        'correctAnswer': 1
    },
    {
        'id': 1,
        'examId': 0,
        'text': 'open question?',
        'options': null,
        'score': 10,
        'isPeerReview': true,
        'category': 'open',
        'correctAnswer': null
    },
    {
        'id': 2,
        'examId': 0,
        'text': 'check 1 and 2',
        'options': ['maybe', 'ok', 'sure'],
        'score': 5,
        'isPeerReview': false,
        'category': 'check',
        'correctAnswer': [1, 2]
    }
];

module.exports = task_data;