import React from "react";
import ClientForm from "./ClientForm";

export default class AddClient extends React.Component {
    render() {
        return(
            <div className="container">
                <h1>Fill in the form to add a new client</h1>
                <ClientForm client='undefined' />
            </div>
        )
    }
}