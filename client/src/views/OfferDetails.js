import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getDataById, deleteRecord } from '../utils/helperFunctions.js';
import OfferForm from './OfferForm.js';

export default function OfferDetails() {
    const { id } = useParams();
    let [ offerDetails, setOfferDetails ] = useState([]);
    let [ showForm, setShowForm ] = useState(false);
    const onClick = () => showForm ? setShowForm(false) : setShowForm(true);

    function handleDelete() {
        deleteRecord(`http://localhost:3000/offers/${id}/delete`);
    }

    function handleDownload() {
        window.location.href=`http://localhost:3000/download/offers/${offerDetails['file_name']}`;
    }

    useEffect(() => {
        getDataById(`http://localhost:3000/offers/${id}`)
        .then(offer => {
            if (offer) {
                offer['start_date'] = offer['start_date'].substring(0, 10);
                offer['exp_date'] = offer['exp_date'].substring(0, 10);
                setOfferDetails(offer);
            }
        });
    }, [id]);

    return(
        <div className='container'>
            <h1>Offers's Details</h1>
            <div className='flex-container'>
                <div className='client-details'>
                    <div><span className='dtls-label'>Offers's id</span>: {offerDetails.id}</div>
                    <div><span className='dtls-label'>Offers's code</span>: {offerDetails['offer_code']}</div>
                    <div><span className='dtls-label'>Offers's description</span>: {offerDetails.description}</div>
                    <div><span className='dtls-label'>Offers's starting date</span>: {offerDetails['start_date']}</div>
                    <div><span className='dtls-label'>Offers's expiring date</span>: {offerDetails['exp_date']}</div>
                    <div><span className='dtls-label'>Offers's pdf file</span>: {offerDetails['file_name']}
                        <button onClick={ handleDownload }>Click here to download the file</button>
                    </div>
                    <button onClick = { onClick }>Edit Offer</button>
                    <button onClick = { handleDelete }>Delete Offer</button>
                </div>
                <div className='form-col'>
                    { showForm ? <OfferForm offer={ offerDetails }/> : null }
                </div>
            </div>
      </div>
    )
}