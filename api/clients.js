const express = require('express');
const client = express.Router();
const { Op } = require("sequelize");
const { Client, Offer, Quote } = require('../migrations.js');
const { saveFile } = require('./utils/saveFile');

client.get('/', async (req, res, next) => {
    try {

        let allClients = await Client.findAll();
        if (allClients) {
            return res.status(200).json({ data: allClients });
        }

        return res.sendStatus(500);        

    } catch(err) {
        next(err);
    }
    
});

client.get('/:id', async(req, res, next) => {

    let { id } = req.params;

    try {

        let clientByID = await Client.findByPk(id, { include: [Offer, Quote] });
        if (clientByID) {
            return res.status(200).json({ data: clientByID });
        }

        return res.sendStatus(500);

    } catch(err) {
        next(err);
    }
    
});

client.post('/add', async(req, res, next) => {

    let fileName = undefined;
    if (req.files) {
        let { img } = req.files;
        fileName = saveFile(img, 'img');
    }
    
    let { firstname, lastname, email, phone, notes, offers } = req.body;

    try {

        let newClient = await Client.create({
            firstname,
            lastname,
            email,
            phone,
            notes,
            img: fileName
        });

        let offersToAssociate = await Offer.findAll({
            where: { id: { [Op.in]: offers.split(',') }}
        });

        if (offersToAssociate.length && newClient) {
            await newClient.addOffers(offersToAssociate);
            return res.status(201).json({ success: true });
        }

        return res.sendStatus(400);

    } catch(err) {
        next(err);
    }
    
});

client.put('/:id/edit', async(req, res, next) => {

    let { id } = req.params;

    let { firstname, lastname, email, phone, notes, offers } = req.body;

    try {

        let clientToUpdate = await Client.findByPk(id);

        if (!clientToUpdate) {
            return res.sendStatus(404);
        }

        let allOffersAssociated = await clientToUpdate.getOffers();
        await clientToUpdate.removeOffers(allOffersAssociated);
        
        if (offers) {
            let offersToAssociate = await Offer.findAll({
                where: { id: { [Op.in]: offers.split(',') }}
            });
            await clientToUpdate.addOffers(offersToAssociate);
        }

        let fileName = clientToUpdate.img;

        if (req.files) {
            let { img } = req.files;
            fileName = saveFile(img, 'img');
        }

        await clientToUpdate.update({
            firstname,
            lastname,
            email,
            phone,
            notes,
            img: fileName
        });

        await clientToUpdate.save();

        return res.status(201).json({ success: true });

    } catch(err) {
        next(err);
    }
});

client.delete('/:id/delete', async(req, res, next) => {
    let { id } = req.params;

    try {

        let clientToDelete = await Client.findByPk(id);

        if (clientToDelete) {
            await clientToDelete.destroy();

            return res.status(200).json({ success: true });
        }

    } catch(err) {
        next(err);
    }
});








module.exports = client;