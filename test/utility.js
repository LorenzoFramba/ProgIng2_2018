const config = require('config');
const fetch = require('node-fetch');

function createUrl(path) {
    let baseUrl = config.get('endpoint');
    const basePath = config.get('basePath');
    let port = process.env.PORT || config.get('port');
    let url = `${baseUrl}:${port}/${basePath}/${path}`;

    return url;
};

function createQuery(...paramMap) {
    return paramMap.reduce((acc, cur, i, arr) => {
        return `${acc}${cur.name}=${cur.value}${i == arr.length - 1 ? "" : '&'}`;
    }, '?');
}

async function getToken(username, password) {
    let userData = {
        "username": username,
        "password": password
    }

    let url = createUrl('Token');
    let options = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        let token = await fetch(url, options);
        let jsonToken = await token.text();
        return jsonToken;
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    createUrl: createUrl,
    getToken: getToken,
    createQuery: createQuery
};