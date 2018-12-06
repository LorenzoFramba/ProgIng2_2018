const fetch = require("node-fetch");

it('works with promise', () => {
    expect.assertions(1); // mi aspetto che ci siano 2 expect dopo, utile per una catena di promise
    return fetch("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400").then(
        res => {expect(res.status).toBe(200)}
    )
})