const fetch = require("node-fetch");
let Exam = require("../model/exam");

let exams = Array();
//inizializzo i casi di test
beforeAll(() => {
    exams.push(new Exam(123, 321, "analisi", 32.3 ,1543947625772 , 1543947625772,[], 4345, 43));
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
            body: JSON.stringify(new User(123, "bo", undefined, undefined, undefined, undefined, undefined)),
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
                return fetch('http://localhost:3000/user/' + idDelete, options).then(
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