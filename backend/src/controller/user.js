const { exec } = require("../db/mysql")

const login = (userName, password) => {
    const sql = `select * from users where userName='${userName}' and password='${password}';`
    return exec(sql).then(rows => {
        return rows[0];
    });
}

module.exports = {
    login
}