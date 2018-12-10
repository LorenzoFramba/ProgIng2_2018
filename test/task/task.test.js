const fetch = require('node-fetch');
const utils = require('../utility');
let Task = require('../../model/task');

// tp do : adjust post method because test doesn't pass

let url = utils.createUrl('Tasks');
let userData = {
    email : "gino@pino.it",
	password : "ciccio"
}
let token;
let header;

beforeAll(async () => {
    token = await utils.getToken(userData.email, userData.password);
    header = {
        'Authorization': `Bearer ${token}`
    };
});

// test for test the test
describe('test stupido', () => {
    test("1=1", () => {
        expect(1).toBe(1);
    })
})


// TEST FOR GET
describe('GET /Tasks', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
    });

    // 200 ok 
    test('200 (ok)', async () => {
        let testUrl = url + '/0/0';
        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(200); // first assertion
            let returned = await res.json();
            expect(returned).toEqual({
                'id': 0,
                'examId': 0,
                'text': '2 + 2',
                'options': ['3', '4', '5'],
                'score': 5,
                'isPeerReview': false,
                'category': 'radio',
                'correctAnswer': 1
            });
        });
    });

    
    // 400 Bad request
    test('404 not found, wrong parameters', async () => {
        let testUrl = url + '/0/ciao';
        expect.assertions(2);
        
        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);
            let returned = await res.json();
            expect(returned.code).toEqual('A0007');
        });
    });

    test('404 (not found), no object in mock', async () => {
        let testUrl = url + '/3/6';
        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);
            let returned = await res.json();
            expect(returned.code).toEqual('A0007');
        });
    });
});

// TEST FOR POST 
describe('POST  /Tasks', () => {

    test('204 ok -> post success', async () => {
        let options = {
            method: 'POST',
            body: {
                "id": 0,
                "examId": 0,
                "text": "2 + 2",
                "options": [
                    "3",
                    "4",
                    "5"
                ],
                "score": 6,
                "isPeerReview": false,
                "category": "radio",
                "correctAnswer": 1
            },
            headers: header
        };

        expect.assertions(1);
        return fetch(url, options).then(async (res) => {
            expect(res.status).toBe(204);
        });
    });

    test('400 Bad request -> wrong data User', async () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Task(1,12,undefined,undefined,2,undefined,undefined,undefined)),
            headers: header
        };

        expect.assertions(1);
        return fetch(url, options).then(async (res) => {
            expect(res.status).toBe(400);
        });
    });

    test('400 error body', async () => {
        let options = {
            method: 'POST',
            body: "wrong data",
            headers: header
        };

        expect.assertions(1);
        return fetch(url, options).then(async (res) => {
            expect(res.status).toBe(400);
        });
    });
});

// TEST FOR PUT 
describe('PUT /Tasks', () => {
    let testUrl = url + '/0/0';
    test('204 ok -> put success', async () => {
        let options = {
            method: 'PUT',
            body: {
                "id": 0,
                "examId": 0,
                "text": "2 + 2",
                "options": [
                    "3",
                    "5",
                    "5"
                ],
                "score": 5,
                "isPeerReview": false,
                "category": "radio",
                "correctAnswer": 1
            },
            headers: header
        };

        expect.assertions(1);
        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(204);
        });
    });
});
// TEST FOR DELETE 



