const fs = require('fs');
const path = require('path');

function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../../logs', fileName);
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream;
}

function access(log) {
    writeLog(createWriteStream('access.log'), log);
}

module.exports = {
    access
}