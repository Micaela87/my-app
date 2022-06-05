import React from "react";
import { updateClient, addClient } from "../utils/helperFunctions";

export default class OfferForm extends React.Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();

        this.state = {
            id: this.props.offer.id ? this.props.offer.id : '',
            offer_code: this.props.offer['offer_code'] ? this.props.offer['offer_code'] : '',
            description: this.props.offer.description ? this.props.offer.description : '',
            start_date: this.props.offer['start_date'] ? this.props.offer['start_date'].substring(0, 10) : '',
            exp_date: this.props.offer['exp_date'] ? this.props.offer['exp_date'].substring(0, 10) : '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;

        let newData = {};
        if (target.type !== 'file') {
            newData[target.name] = target.value;
            this.setState(newData);
        }
    }

    handleSubmit() {

        let data = this.state;
        data['file_name'] = this.fileInput.current.files[0];

        if (this.props.offer !== 'undefined') {
            updateClient(`http://localhost:3000/offers/${this.state.id}/edit`, data);
        } else {
            addClient(`http://localhost:3000/offers/add`, data);
        }
        
    }
    render() {
        return(
            <div className='client-form'>
                <form>
                    <div>
                        <label className="dtls-label" htmlFor="offer-code">Offer Code</label>
                        <input type="text" id="offer-code" name="offer_code" value={this.state['offer_code']} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="start_date">Starting Date</label>
                        <input type="date" id="start_date" name="start_date" value={this.state.start_date} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="exp_date">Expiring Date</label>
                        <input type="date" id="exp_date" name="exp_date" value={this.state['exp_date']} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="img">Document</label>
                        <input type="file" id="img" name="img" ref={this.fileInput}></input>
                    </div> 
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
    
}