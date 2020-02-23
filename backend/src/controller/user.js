const { exec, escape } = require("../db/mysql");
const { genPassword } = require('../utilities/cryp')

const login = (userName, password) => {
    userName = escape(userName);
    password = escape(genPassword(password));
    const sql = `select * from users where userName=${userName} and password=${password};`
    return exec(sql).then(rows => {
        return rows[0];
    });
}

module.exports = {
    login
}