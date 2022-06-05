import React from "react";
import { updateClient, addClient, getAllData } from "../utils/helperFunctions";

export default class QuoteForm extends React.Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();

        this.state = {
            quote: {
                id: this.props.quote.id ? this.props.quote.id : '',
                quote_code: this.props.quote['quote_code'] ? this.props.quote['quote_code'] : '',
                description: this.props.quote.description ? this.props.quote.description : '',
                start_date: this.props.quote['start_date'] ? this.props.quote['start_date'].substring(0, 10) : '',
                exp_date: this.props.quote['exp_date'] ? this.props.quote['exp_date'].substring(0, 10) : '',
                client_id: this.props.quote['client_id'] ? this.props.quote['client_id'] : '',
            },
            clients: []
            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        getAllData('http://localhost:3000/clients')
        .then((result) => {
            if (result.length) {
                this.setState({ clients: result });
            }
        })
    }

    handleChange(event) {
        let target = event.target;

        console.log(target.value);

        let newData = {...this.state.quote};
        if (target.type !== 'file') {
            newData[target.name] = target.value;
            console.log(newData);
            this.setState({quote: newData});
        }
    }

    handleSubmit() {
        let data = this.state.quote;
        data['file_name'] = this.fileInput.current.files[0];

        if (this.props.quote !== 'undefined') {
            updateClient(`http://localhost:3000/quotes/${this.state.quote.id}/edit`, data);
        } else {
            addClient(`http://localhost:3000/quotes/add`, data);
        }
        
    }
    render() {
        return(
            <div className='client-form'>
                <form>
                    <div>
                        <label className="dtls-label" htmlFor="quote-code">Quote Code</label>
                        <input type="text" id="quote-code" name="quote_code" value={this.state.quote['quote_code']} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" value={this.state.quote.description} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="start_date">Starting Date</label>
                        <input type="date" id="start_date" name="start_date" value={this.state.quote.start_date} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="exp_date">Expiring Date</label>
                        <input type="date" id="exp_date" name="exp_date" value={this.state.quote['exp_date']} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="img">Document</label>
                        <input type="file" id="img" name="img" ref={this.fileInput} ></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor="client_id">Client</label>
                        <select value={this.state.quote.client_id} onChange={this.handleChange} name="client_id">
                            {this.state.clients.map((client) => {
                                return <option key={client.id} value={client.id}>{ client.firstname } { client.lastname }</option>
                            })}
                        </select>
                    </div>
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
    
}

