import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getDataById, deleteRecord } from '../utils/helperFunctions.js';
import QuoteForm from './QuotesForm.js';

export default function QuoteDetails() {
    const { id } = useParams();
    let [ quoteDetails, setQuoteDetails ] = useState([]);
    let [ clientDetails, setClientDetails ] = useState([]);
    let [ showForm, setShowForm ] = useState(false);
    const onClick = () => showForm ? setShowForm(false) : setShowForm(true);
    
    function handleDelete() {
        deleteRecord(`http://localhost:3000/quotes/${id}/delete`);
    }

    function handleDownload() {
        window.location.href=`http://localhost:3000/download/quotes/${quoteDetails['file_name']}`;
    }

    useEffect(() => {
        getDataById(`http://localhost:3000/quotes/${id}`)
        .then(quote => {
            if (quote.quoteByID) {
                quote.quoteByID['start_date'] = quote.quoteByID['start_date'].substring(0, 10);
                quote.quoteByID['exp_date'] = quote.quoteByID['exp_date'].substring(0, 10);
                setQuoteDetails(quote.quoteByID);
            }

            if (quote.client) {
                setClientDetails(quote.client);
            }
        });
    }, [id]);

    return(
        <div className='container'>
            <h1>Quotes's Details</h1>
            <div className='flex-container'>
                <div className='client-details'>
                    <div><span className='dtls-label'>Quote's id</span>: {quoteDetails.id}</div>
                    <div><span className='dtls-label'>Quote's code</span>: {quoteDetails['quote_code']}</div>
                    <div><span className='dtls-label'>Quote's description</span>: {quoteDetails.description}</div>
                    <div><span className='dtls-label'>Quote's starting date</span>: {quoteDetails['start_date']}</div>
                    <div><span className='dtls-label'>Quote's expiring date</span>: {quoteDetails['exp_date']}</div>
                    <div><span className='dtls-label'>Quote's client</span>: {clientDetails.firstname} {clientDetails.lastname}</div>
                    <div><span className='dtls-label'>Quote's pdf file</span>: {quoteDetails['file_name']}
                        <button onClick={ handleDownload }>Click here to download the file</button>
                    </div>
                    <button onClick = { onClick }>Edit Quote</button>
                    <button onClick = { handleDelete }>Delete Quote</button>
                </div>
                <div className='form-col'>
                    { showForm ? <QuoteForm quote={ quoteDetails }/> : null }
                </div>
            </div>
      </div>
    )
}