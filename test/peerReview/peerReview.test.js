const fetch = require('node-fetch');
const utils = require('../utility');

let url = utils.createUrl('PeerReviews');
let userData = {
	email : "gino@pino.it",
	password : "ciccio"
}
let header;

function createPeerReviewQuery(userId, reviewerId, taskId, examId) {
    return utils.createQuery(
        reviewerId === undefined ? undefined : 
        {
            name: 'reviewer',
            value: reviewerId
        },
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

describe('GET /PeerReviews', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'GET',
            headers: header
        };
    });

    test('Success -> 200 (OK)', async () => {
        let userId = 1;
        let taskId = 1;
        let examId = 0;
        let reviewerId = 0;
        let queries = createPeerReviewQuery(userId, reviewerId, taskId, examId);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(200);

            let retObj = await res.json();
            expect(retObj).toEqual({
                'userId': userId,
                'examId': examId,
                'taskId': taskId,
                'reviewerId': reviewerId,
                'value': 'reviewerAnswer1001'
            });
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createPeerReviewQuery(1)
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createPeerReviewQuery("1.23", "test", 3.43, null);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 401 (Unauthorized) :: User access on not owned PeerReview', async () => {
        let queries = createPeerReviewQuery(3, 1, 0, 0);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(401);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0005');
        });
    });

    test('Failed -> 404 (Not Found) :: PeerReview does not exist', async () => {
        let queries = createPeerReviewQuery(1, 0, 3, 1);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0007');
        });
    });
});

describe('POST /PeerReviews', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'POST',
            headers: header,
            body: {
                value: 'PeerReview'
            }
        };
    });

    test('Success -> 204 (No Content)', () => {
        let queries = createPeerReviewQuery(1, undefined, 3, 1);
        let testUrl = url + queries;

        expect.assertions(1);

        return fetch(testUrl, options).then((res) => {
            expect(res.status).toBe(204);
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createPeerReviewQuery(undefined, 2, undefined);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createPeerReviewQuery(21, undefined, 'test', 1.23);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 400 (Bad Request) :: Duplicated PeerReview', async () => {
        let queries = createPeerReviewQuery(1, undefined, 1, 0);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('M0003');
        });
    });
});

describe('PUT /PeerReviews', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'PUT',
            headers: header,
            body: {
                value: 'tested'
            }
        };
    });

    test('Success -> 204 (No Content)', () => {
        let queries = createPeerReviewQuery(1, undefined, 1, 0);
        let testUrl = url + queries;

        expect.assertions(1);

        return fetch(testUrl, options).then((res) => {
            expect(res.status).toBe(204);
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createPeerReviewQuery(1);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createPeerReviewQuery(1, undefined, 'test', '1.2345');
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 404 (Not Found) :: PeerReview not found', async () => {
        let queries = createPeerReviewQuery(1, undefined, 1, 1);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);

            let retObj = await res.json();
            expect(retObj.code).toEqual('M0002');
        });
    });
});

describe('DELETE /PeerReviews', () => {
    let options;
    beforeAll(() => {
        options = {
            method: 'DELETE',
            headers: header
        };
    });

    test('Success -> 204 (No Content)', async () => {
        let queries = createPeerReviewQuery(1, undefined, 1, 0);
        let testUrl = url + queries;

        expect.assertions(1);

        return fetch(testUrl, options).then((res) => {
            expect(res.status).toBe(204);
        });
    });

    test('Failed -> 400 (Bad Request) :: Undefined params', async () => {
        let queries = createPeerReviewQuery(1);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0001');
        });
    });

    test('Failed -> 400 (Bad Request) :: Wrong type params', async () => {
        let queries = createPeerReviewQuery(0, undefined, 'test', '1.2345');
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(400);

            let retObj = await res.json();
            expect(retObj.code).toEqual('A0008');
        });
    });

    test('Failed -> 404 (Not Found) :: PeerReview not found', async () => {
        let queries = createPeerReviewQuery(1, undefined, 1, 1);
        let testUrl = url + queries;

        expect.assertions(2);

        return fetch(testUrl, options).then(async (res) => {
            expect(res.status).toBe(404);

            let retObj = await res.json();
            expect(retObj.code).toEqual('M0002');
        });
    });
});