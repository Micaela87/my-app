import React from 'react';
import { Link } from "react-router-dom";
import { getAllData } from '../utils/helperFunctions';

class Quotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: []
        }
    }

    componentDidMount() {
        getAllData('http://localhost:3000/quotes').then(quotes => {
            if (quotes.length) {
                console.log(quotes);
                this.setState({ quotes }); 
            }
        });
    }

    renderQuotes() {
        return this.state.quotes.map(quote => {
            return (
                <Link to={`/quotes/${quote.id}`}
                    className="item"
                    key={quote.id}>
                    <h3>{quote['quote_code']}</h3>
                    <p>{quote.description}</p>
                    <span>{quote['start_date'].substring(0, 10)}</span>
                    <span>{quote['exp_date'].substring(0, 10)}</span>
                </Link>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Quotes currently active</h1>
                <div className='flex-container'>
                    { this.renderQuotes() }
                </div>
                <Link to="/quotes/add"><button>Add a new quote</button></Link>
            </div>
        );
    }
    
}

export default Quotes;