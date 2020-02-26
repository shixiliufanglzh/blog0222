const crypto = require('crypto');

const SECRET_KEY = 'reed_20200222';

function md5(str) {
    let md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex');
}

function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

module.exports = {
    genPassword
}