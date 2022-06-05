import React from "react";
import QuoteForm from "./QuotesForm";

export default class AddQuote extends React.Component {
    render() {
        return(
            <div className="container">
                <h1>Fill in the form to add a new quote</h1>
                <QuoteForm quote='undefined' />
            </div>
        )
    }
}