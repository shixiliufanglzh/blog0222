const fs = require('fs');
const path = require('path');
const readline = require('readline');

function writeLog(writeStream, log) {
    writeStream.write(log + '\n')
}

const fullFileName = path.join(__dirname, '../../logs/2020-02-23.access.log');
const readStream = fs.createReadStream(fullFileName);

const rl = readline.createInterface({
    input: readStream
})

let chromeCount = 0;
let sum = 0;

rl.on('line', lineData => {
    if (!lineData) {
        return;
    }
    if (lineData.toString().toLowerCase().indexOf('chrome') > 0) {
        chromeCount += 1;
    }
    sum += 1
})

rl.on('close', () => {
    console.log(`chrome accounts for ${(chromeCount * 100 / sum).toFixed(1)}% of the total`)
})
