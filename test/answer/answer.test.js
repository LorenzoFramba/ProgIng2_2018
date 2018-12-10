const fetch = require('node-fetch');
const utils = require('../utility');

let url = utils.createUrl('Answers');
let userData = {
	"username": "ginopino",
	"password": "ciccio"
}
let token;
let header;

beforeAll(async () => {
    token = await utils.getToken(userData.username, userData.password);
    header = {
        'Authorization': `Bearer ${token}`
    };
});

describe('GET /Answers', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
    });

    test('Success -> 200 (OK)', async () => {
        let userId = 0;
        let taskId = 0;
        let examId = 0;
        let queries = utils.createQuery({
            name: 'user',
            value: userId
        },
        {
            name: 'task',
            value: taskId
        },
        {
            name: 'exam',
            value: examId
        });
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(200);

            let retObj = await res.json();
            expect(retObj).toEqual({
                'userId': userId,
                'examId': examId,
                'taskId': taskId,
                'value': 1
            });
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = utils.createQuery({
            name: 'user',
            value: 0
        });
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = utils.createQuery({
            name: 'user',
            value: 0
        },
        {
            name: 'task',
            value: 'test'
        },
        {
            name: 'exam',
            value: 1.234
        });
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 401 (Unauthorized) :: User access on not owned answer', async () => {
        let queries = utils.createQuery({
            name: 'user',
            value: 1
        },
        {
            name: 'task',
            value: 0
        },
        {
            name: 'exam',
            value: 0
        });
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(401);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0005');
        });
    });

    test('Failed -> 404 (Not Found) :: answer does not exist', async () => {
        let queries = utils.createQuery({
            name: 'user',
            value: 0
        },
        {
            name: 'task',
            value: 100
        },
        {
            name: 'exam',
            value: 0
        });
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0007');
        });
    });
});

// describe('POST /Answers', () => {
//     test('Success -> 204 (No Content)', async () => {

//     });

//     test('Failed -> ');
// });