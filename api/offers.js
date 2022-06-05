const express = require('express');
const offer = express.Router();
const { Offer } = require('../migrations.js');
const { saveFile } = require('./utils/saveFile.js');

offer.get('/', async (req, res, next) => {
    try {

        let allOffers = await Offer.findAll();
        if (allOffers) {
            return res.status(200).json({ data: allOffers });
        }

        return res.sendStatus(500);        

    } catch(err) {
        next(err);
    }
    
});

offer.get('/:id', async(req, res, next) => {

    let { id } = req.params;

    try {

        let offerByID = await Offer.findByPk(id);
        if (offerByID) {
            return res.status(200).json({ data: offerByID });
        }

        return res.sendStatus(500);

    } catch(err) {
        next(err);
    }
    
});

offer.post('/add', async(req, res, next) => {

    let fileName = undefined;
    if (req.files) {
        let { file_name } = req.files;
        fileName = saveFile(file_name, 'offers');
    }

    let { offer_code, description, start_date, exp_date } = req.body;

    try {

        let newOffer = await Offer.create({
            offer_code,
            description,
            file_name: fileName,
            start_date,
            exp_date
        });

        if (newOffer) {
            return res.status(201).json({ success: true, newOffer });
        }

        return res.sendStatus(400);

    } catch(err) {
        next(err);
    }
    
});

offer.put('/:id/edit', async(req, res, next) => {

    let { id } = req.params;
    let { offer_code, description, start_date, exp_date } = req.body;

    try {

        let offerToUpdate = await Offer.findByPk(id);

        if (!offerToUpdate) {
            return res.sendStatus(404);
        }

        let fileName = offerToUpdate['file_name'];
        if (req.files) {
            let { file_name } = req.files;
            fileName = saveFile(file_name, 'offers');
        }

        await offerToUpdate.update({
            offer_code,
            description,
            file_name: fileName,
            start_date,
            exp_date
        });

        await offerToUpdate.save();

        return res.status(201).json({ success: true });

    } catch(err) {
        next(err);
    }
});

offer.delete('/:id/delete', async(req, res, next) => {
    let { id } = req.params;

    try {

        let offerToDelete = await Offer.findByPk(id);

        if (offerToDelete) {
            await offerToDelete.destroy();

            return res.status(200).json({ success: true });
        }

    } catch(err) {
        next(err);
    }
});

















module.exports = offer;