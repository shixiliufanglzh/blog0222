const { exec, escape } = require("../db/mysql");
const { genPassword } = require('../utilities/cryp')

const login = async (userName, password) => {
    userName = escape(userName);
    password = escape(genPassword(password));
    const sql = `select * from users where userName=${userName} and password=${password};`
    const rows = await exec(sql);
    return rows[0]; 
}

module.exports = {
    login
}