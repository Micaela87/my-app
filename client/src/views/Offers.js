import React from 'react';
import { Link } from 'react-router-dom';
import { getAllData } from '../utils/helperFunctions';

class Offers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: []
        }
    }

    componentDidMount() {
        getAllData('http://localhost:3000/offers')
        .then(offers => {
            if (offers.length) {
                this.setState({ offers });
            }
        });
    }

    renderOffers() {
        return this.state.offers.map(offer => {
            return (
                <Link to={`/offers/${offer.id}`}
                    className="item"
                    key={offer.id}>
                    <h3>{offer['offer_code']}</h3>
                    <p>{offer.description}</p>
                    <span>{offer['start_date'].substring(0, 10)} - </span>
                    <span>{offer['exp_date'].substring(0, 10)}</span>
                </Link>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Offers currently active</h1>
                <div className='flex-container'>
                    { this.renderOffers() }
                </div>
                <Link to="/offers/add"><button>Add a new offer</button></Link>
            </div>
        );
    }
    
}

export default Offers;