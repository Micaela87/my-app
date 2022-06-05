import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getDataById, deleteRecord } from '../utils/helperFunctions.js';
import ClientForm from './ClientForm.js';
import SendMail from './SendEmail.js';



export default function ClientDetails() {
    const { id } = useParams();
    const [ showForm, setShowForm ] = useState(false);
    const [ sendEmail, setSendEmail ] = useState(false);
    let [ clientDetails, setClientDetails ] = useState([]);
    let [ clientOffers , setClientOffers ] = useState([]);
    let [ clientQuotes , setClientQuotes ] = useState([]);
    const onClick = () => showForm ? setShowForm(false) : setShowForm(true);
    const sendEmailForm = () => sendEmail ? setSendEmail(false) : setSendEmail(true);
    
    function handleDelete() {
        deleteRecord(`http://localhost:3000/clients/${id}/delete`);
    }

    useEffect(() => {
        getDataById(`http://localhost:3000/clients/${id}`)
        .then(client => {
            if (client) {
                setClientDetails(client);
                setClientOffers(client.Offers);
                setClientQuotes(client.Quotes);
            }
        });
    }, [id]);

    function renderClientOffers() {
        return clientOffers.map((offer) => {
            return <li key={ offer.id }>{ offer['offer_code' ]}</li>
        });
    }

    function renderClientQuotes() {
        return clientQuotes.map((quote) => {
            return <li key={ quote.id }>{ quote['quote_code' ]}</li>
        });
    }

    return(
        <div className='container'>
            <h1>Client's Details</h1>
            <div className='flex-container'>
                <div className='client-details'>
                    <div><span className='dtls-label'>Client's id</span>: {clientDetails.id}</div>
                    <div><span className='dtls-label'>Client's firstname</span>: {clientDetails.firstname}</div>
                    <div><span className='dtls-label'>Client's lastname</span>: {clientDetails.lastname}</div>
                    <div><span className='dtls-label'>Client's email</span>: {clientDetails.email}</div>
                    <div><span className='dtls-label'>Client's phone</span>: {clientDetails.phone}</div>
                    <div><span className='dtls-label'>Client's notes</span>: {clientDetails.notes}</div>
                    <div><span className='dtls-label'>Client's active offers</span>:
                        <ul>
                            { renderClientOffers() }
                        </ul>
                    </div>
                    <div><span className='dtls-label'>Client's active quotes</span>:
                        <ul>
                            { renderClientQuotes() }
                        </ul>
                    </div>
                    <button onClick = { onClick }>Edit Client</button>
                    <button onClick = { sendEmailForm }>Send Email</button>
                    <button onClick = { handleDelete }>Delete Client</button>
                </div>
                <div className='form-col'>
                    { showForm ? <ClientForm client={ clientDetails } offers={ clientOffers }/> : null }
                    { sendEmail ? <SendMail client={ clientDetails } /> : null }
                </div>
            </div>
      </div>
    )
    
}