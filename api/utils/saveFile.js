const path = require('path');

function saveFile(file, directory) {
    let newFileName = Math.floor(Math.random() * (10000 - 999) + 999) + '_' + Math.floor(Math.random() * (10000 - 999) + 999) + path.extname(file.name);
    file.mv(`./client/public/storage/${directory}/${newFileName}`);
    return newFileName;
}

module.exports = { saveFile };