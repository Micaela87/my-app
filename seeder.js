const { Client, Offer, Quote } = require('./migrations.js');

let newClient = Client.create({
    firstname: 'Micaela',
    lastname: 'Milano',
    email: 'milano.micael@gmail.com',
    phone: '3427993642',
    notes: null,
    img: undefined
});

let newOffer = Offer.create({
    offer_code: '124_ABC',
    description: null,
    file_name: undefined,
    start_date: '2022-05-05',
    exp_date: '2022-06-05'
});

Quote.create({
    quote_code: 'QUOTE_1',
    description: null,
    file_name: undefined,
    start_date: '2022-05-05',
    exp_date: '2022-06-05',
    client_id: 1
});