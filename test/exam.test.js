const fetch = require("node-fetch");
let Exam = require("../model/exam");

let exams = Array();
//inizializzo i casi di test
beforeAll(() => {
    exams.push(new exams(123, 321, "analisi", 32.3 ,1543947625772 , 1543947625772,[], 4345, 43));




    jest.setTimeout(100000); //evito che le richieste vadano in timeout troppo presto (mi serve per debug)
})

//classe di test par la post exam
describe('create exam', () => {
    test("should create exam", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(exams[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch('http://localhost:3000/exam', options).then(
            res => res.json().then(examReturned => {
                expect(res.status).toBe(201);
                exams[0].id = examReturned.id;
                expect(examReturned).toEqual(exams[0]);
            })
        )
    });

    test("wrong body data, should return 400", () => {
        let options = {
            method: 'POST',
            body: "wrong data"
        }
        
        expect.assertions(1); //mi aspetto 1 expect, il return è importante se no mi salta
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });


    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new exam(123, "bo", undefined, undefined, undefined, undefined, undefined)),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });

    

    test("should delete the specified exam", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(exams[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(4);

        return fetch('http://localhost:3000/exam', options).then(
            res => res.json().then(examReturned => {
                expect(res.status).toBe(201);
               let idDelete = examReturned.id;
                options = {
                    method: 'DELETE'
                }
                return fetch('http://localhost:3000/exam/' + idDelete, options).then(
                    res2 => {expect(res2.status).toBe(200);                    
                    })
            })
            
        )
    });
    

    test("wrong body data, should return 400", () => {
        let options = {
            method: 'POST',
            body: "wrong data"
        }
        
        expect.assertions(1); //mi aspetto 1 expect, il return è importante se no mi salta
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });


    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(123, "bo", undefined, undefined, undefined, undefined, undefined)),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
});





























const fetch = require("node-fetch");
let Exam = require("../model/exam");

let exams = Array();
//inizializzo i casi di test
beforeAll(() => {
    exams.push(new exams(123, 321, "analisi", 32.3 ,1543947625772 , 1543947625772,[], 4345, 43));
    jest.setTimeout(100000); //evito che le richieste vadano in timeout troppo presto (mi serve per debug)
})

//classe di test par la post exam
describe('create exam', () => {
    test("should create exam", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(exams[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(2); //mi aspetto 2 expect, return importante se no salta, => indica la callback
        return fetch('http://localhost:3000/exam', options).then(
            res => res.json().then(examReturned => {
                expect(res.status).toBe(201);
                exams[0].id = examReturned.id;
                expect(examReturned).toEqual(exams[0]);
            })
        )
    });

    test("wrong body data, should return 400", () => {
        let options = {
            method: 'POST',
            body: "wrong data"
        }
        
        expect.assertions(1); //mi aspetto 1 expect, il return è importante se no mi salta
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });


    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new exam(undefined, 321, "analisi", 32.3 ,1543947625772 , 1543947625772,[], 4345, 43)),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(123, undefined, "analisi", 32.3 ,1543947625772 , 1543947625772,[], 4345, 43)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, undefined, 32.3 ,1543947625772 , 1543947625772,[], 4345, 43)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(123, 321, "analisi", undefined ,1543947625772 , 1543947625772,[], 4345, 43)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(231, 321, "analisi", 32.3 ,undefined , 1543947625772,[], 4345, 43)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(321, 321, "analisi", 32.3 ,1543947625772 , undefined,[], 4345, 43)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(321, 321, "analisi", 32.3 ,1543947625772 , 1543947625772,undefined, 4345, 43)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(213, 321, "analisi", 32.3 ,1543947625772 , 1543947625772,[], undefined, 43)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });
    test("wrong exam data, should return 400", () => {
        let options = {
            method: 'POST',
            body: JSON.stringify(new Exam(432, 321, "analisi", 32.3 ,1543947625772 , 1543947625772,[], 4345, undefined)),
            headers: { 'Content-Type': 'application/json' }
        }
        expect.assertions(1);
        return fetch('http://localhost:3000/exam', options).then(
            res => {
                expect(res.status).toBe(400);
            })
    });    
});


describe('delete exam by id', () => {
    test("should delete the specified exam", () => {
        //opzioni da mettere nella richiesta
        let options = {
            method: 'POST',
            body: JSON.stringify(exams[0]),
            headers: { 'Content-Type': 'application/json' }
        }

        expect.assertions(4);

        return fetch('http://localhost:3000/exam', options).then(
            res => res.json().then(examReturned => {
                expect(res.status).toBe(201);
               let idDelete = examReturned.id;
                options = {
                    method: 'DELETE'
                }
                return fetch('http://localhost:3000/exam/' + idDelete, options).then(
                    res2 => {expect(res2.status).toBe(200);                    
                    })
            })
            
        )
    });


});
