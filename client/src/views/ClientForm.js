import React from "react";
import { updateClient, addClient, getAllData } from "../utils/helperFunctions";

export default class ClientForm extends React.Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();

        this.state = {
            clientDetails: {
                id: this.props.client.id ? this.props.client.id : '',
                firstname: this.props.client.firstname ? this.props.client.firstname : '',
                lastname: this.props.client.lastname ? this.props.client.lastname : '',
                email: this.props.client.email ? this.props.client.email : '',
                phone: this.props.client.phone ? this.props.client.phone : '',
                notes: this.props.client.notes ? this.props.client.notes : '',
                quotes: this.props.client.Quotes ? this.props.client.Quotes : '',
            },
            activeOffers: [],
            checkedOffers: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckedOffers = this.handleCheckedOffers.bind(this);
        this.handleDefaultCheckedOffers = this.handleDefaultCheckedOffers.bind(this);
    }

    componentDidMount() {
        getAllData('http://localhost:3000/offers')
        .then((result) => {
            if (result.length) {
                this.setState({ activeOffers: result });
            }
        });

        if (this.props.client.Offers) {
            let alreadyChecked = [];
            this.props.client.Offers.forEach((item) => {
                alreadyChecked.push(item.id);
                this.setState({ checkedOffers: [...alreadyChecked] });
            });

        }
    }

    handleChange(event) {
        let target = event.target;

        let newData = {...this.state.clientDetails};
        newData[target.name] = target.value;
        this.setState({ clientDetails: newData });
        
    }

    handleCheckedOffers(event) {
        let target = event.target;
        let checkedOptions = [...this.state.checkedOffers];

        if (target.checked) {
            checkedOptions.push(target.value);
        } else {
            checkedOptions.splice(this.state.checkedOffers.indexOf(event.target.value), 1);
        }

        this.setState({ checkedOffers: checkedOptions });

    }

    handleDefaultCheckedOffers(id) {
        if (this.state.checkedOffers.includes(id)) {
            return true;
        }
    }

    handleSubmit() {
        let data = this.state.clientDetails;
        data.img = this.fileInput.current.files[0];
        data.offers = this.state.checkedOffers;

        if (this.props.client !== 'undefined') {
            updateClient(`http://localhost:3000/clients/${this.state.clientDetails.id}/edit`, data);
        } else {
            addClient(`http://localhost:3000/clients/add`, data)
        }
        
    }

    render() {
        return(
            <div className='client-form'>
                <form>
                    <div>
                        <label className="dtls-label" htmlFor="name">Firstname</label>
                        <input type="text" id="name" name="firstname" value={this.state.clientDetails.firstname} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="lastname">Lastname</label>
                        <input type="text" id="lastname" name="lastname" value={this.state.clientDetails.lastname} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={this.state.clientDetails.email} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="phone">Phone</label>
                        <input type="text" id="phone" name="phone" value={this.state.clientDetails.phone} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="notes">Notes</label>
                        <textarea type="text" id="notes" name="notes" cols="50" rows="6" value={this.state.clientDetails.notes} onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="img">Profile picture</label>
                        <input type="file" id="img" name="img" ref={this.fileInput} ></input>
                    </div>
                    <div>
                        <label className="dtls-label">Active offers</label>
                        <div>
                            <div>
                                { this.state.activeOffers.map((item, index) => (
                                    <div key={index}>
                                        <input value={item.id} type="checkbox" defaultChecked={ this.handleDefaultCheckedOffers(item.id) } onChange={this.handleCheckedOffers}/>
                                        <label>{item['offer_code']}</label>
                                    </div>
                                )) }
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
    
}