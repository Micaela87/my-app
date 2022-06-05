import React from "react";
import OfferForm from "./OfferForm";

export default class AddOffer extends React.Component {
    render() {
        return(
            <div className="container">
                <h1>Fill in the form to add a new offer</h1>
                <OfferForm offer='undefined' />
            </div>
        )
    }
}