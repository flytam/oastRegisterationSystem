const child_process = require('child_process');

function random() {
    return new Promise((resolve => {
        child_process.exec(' head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 168', {}, (err, stdout, stderr) => {
            resolve(stdout);
        });
    }))
}
module.exports = random;