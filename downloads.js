const express = require('express');
const fileDwn = express.Router();


fileDwn.get('/download/:dir/:file', function(req, res){

    const file = `${__dirname}/client/public/storage/${req.params.dir}/${req.params.file}`;
    res.download(file);

});

module.exports = fileDwn;