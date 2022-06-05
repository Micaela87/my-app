const express = require('express');
const quote = express.Router();
const { Quote, Client } = require('../migrations.js');
const { saveFile } = require('./utils/saveFile.js');

quote.get('/', async (req, res, next) => {
    try {

        let allQuotes = await Quote.findAll();
        if (allQuotes) {
            return res.status(200).json({ data: allQuotes });
        }

        return res.sendStatus(500);        

    } catch(err) {
        next(err);
    }
    
});

quote.get('/:id', async(req, res, next) => {

    let { id } = req.params;

    try {

        let quoteByID = await Quote.findByPk(id);
        let client = await Client.findByPk(quoteByID['client_id']);
        if (quoteByID) {
            return res.status(200).json({ data: { quoteByID, client } });
        }

        return res.sendStatus(500);

    } catch(err) {
        next(err);
    }
    
});

quote.post('/add', async(req, res, next) => {

    let fileName = undefined;
    if (req.files) {
        let { file_name } = req.files;
        fileName = saveFile(file_name, 'quotes');
    }

    let { quote_code, description, start_date, exp_date, client_id } = req.body;

    try {

        let newQuote = await Quote.create({
            quote_code,
            description,
            file_name: fileName,
            start_date,
            exp_date,
            client_id
        });

        if (newQuote) {
            return res.status(201).json({ success: true });
        }

        return res.sendStatus(400);

    } catch(err) {
        next(err);
    }
    
});

quote.put('/:id/edit', async(req, res, next) => {

    let { id } = req.params;
    let { quote_code, description, start_date, exp_date, client_id } = req.body;

    try {

        let quoteToUpdate = await Quote.findByPk(id);

        if (!quoteToUpdate) {
            return res.sendStatus(404);
        }

        let fileName = quoteToUpdate['file_name'];
        if (req.files) {
            let { file_name } = req.files;
            fileName = saveFile(file_name, 'quotes');
        }

        await quoteToUpdate.update({
            quote_code,
            description,
            file_name: fileName,
            start_date,
            exp_date,
            client_id
        });

        await quoteToUpdate.save();

        return res.status(201).json({ success: true });

    } catch(err) {
        next(err);
    }
});

quote.delete('/:id/delete', async(req, res, next) => {
    let { id } = req.params;

    try {

        let quoteToDelete = await Quote.findByPk(id);

        if (quoteToDelete) {
            await quoteToDelete.destroy();

            return res.status(200).json({ success: true });
        }

    } catch(err) {
        next(err);
    }
});










module.exports = quote;