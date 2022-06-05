import React from 'react';
import { sendEmail } from '../utils/helperFunctions';

export default class SendMail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            client: this.props.client,
            email: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.sendMail = this.sendMail.bind(this);
    }

    handleChange(event) {
        let target = event.target;

        let newData = {...this.state.email};
        newData[target.name] = target.value;
        this.setState({ email: newData });
    }

    sendMail() {
        let data = this.state.email;
        data.to = this.state.client.email;
        sendEmail(data);
    }

    render() {
        return(
            <div className='client-form'>
                <form>
                    <div>
                        <label className="dtls-label" htmlFor='email'>Email address</label>
                        <input type='text' value={this.state.client.email} name='to' id='email' readOnly></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor='subject'>Subject</label>
                        <input type='text' id='subject' name='subject' onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label className="dtls-label" htmlFor='body'>Body</label>
                        <textarea type='text' id='body' name='body' onChange={this.handleChange} cols='50' rows='10'></textarea>
                    </div>
                    <button type='button' onClick={this.sendMail}>Send email</button>
                </form>
            </div>
        )
    }
}