const fetch = require('node-fetch');
const utils = require('../utility');

let url = utils.createUrl('Answers');
let userData = {
	email : "gino@pino.it",
	password : "ciccio"
}
let header;

function createAnswerQuery(userId, taskId, examId) {
    return utils.createQuery(
        userId === undefined ? undefined : 
        {
            name: 'user',
            value: userId
        }, 
        taskId === undefined ? undefined :
        {
            name: 'task',
            value: taskId
        }, 
        examId === undefined ? undefined :
        {
            name: 'exam',
            value: examId
        }
    );
}

beforeAll(async () => {
    header = await utils.getAuthHeader(userData.email, userData.password);
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
        let taskId = 1;
        let examId = 0;
        let queries = createAnswerQuery(userId, taskId, examId);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(200);

            let retObj = await res.json();
            expect(retObj).toEqual({
                'userId': userId,
                'examId': examId,
                'taskId': taskId,
                'value': 'answer001'
            });
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createAnswerQuery(1)
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createAnswerQuery("1.23", "test", 3.43)
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 401 (Unauthorized) :: User access on not owned answer', async () => {
        let queries = createAnswerQuery(1, 0, 0);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(401);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0005');
        });
    });

    test('Failed -> 404 (Not Found) :: answer does not exist', async () => {
        let queries = createAnswerQuery(0, 100, 0);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0007');
        });
    });
});

describe('POST /Answers', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'POST',
            headers: header,
            body: {
                value: 'answer'
            }
        };
    });

    test('Success -> 204 (No Content)', () => {
        let queries = createAnswerQuery(undefined, 0, 1);
        let testUrl = url + queries;

        expect.assertions(1);

        return fetch(testUrl, options).then((res) => {
            expect(res.status).toBe(204);
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createAnswerQuery(undefined, 2, undefined);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createAnswerQuery(undefined, 'test', 1.23);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 400 (Bad Request) :: Duplicated Answer', async () => {
        let queries = createAnswerQuery(undefined, 1, 0);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('M0003');
        });
    });
});

describe('PUT /Answers', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'PUT',
            headers: header,
            body: {
                value: 2
            }
        };
    });

    test('Success -> 204 (No Content)', () => {
        let queries = createAnswerQuery(undefined, 1, 0);
        let testUrl = url + queries;

        expect.assertions(1);

        return fetch(testUrl, options).then((res) => {
            expect(res.status).toBe(204);
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createAnswerQuery(1);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createAnswerQuery(undefined, 'test', '1.2345');
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 404 (Not Found) :: Answer not found', async () => {
        let queries = createAnswerQuery(undefined, 100, 0);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0007');
        });
    });
});

describe('DELETE /Answers', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'DELETE',
            headers: header
        };
    });

    test('Success -> 204 (No Content)', async () => {
        let queries = createAnswerQuery(undefined, 2, 0);
        let testUrl = url + queries;

        expect.assertions(1);

        return fetch(testUrl, options).then((res) => {
            expect(res.status).toBe(204);
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createAnswerQuery(1);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createAnswerQuery(undefined, 'test', '1.2345');
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 404 (Not Found) :: Answer not found', async () => {
        let queries = createAnswerQuery(undefined, 105, 0);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);

            let retObj = await res.json();
            expect(retObj.code).toEqual('M0002');
        });
    });
});