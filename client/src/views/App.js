import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddClient from './AddClient';
import ClientDetails from './ClientDetails';
import Clients from './Clients';
import Offers from './Offers';
import Quotes from './Quotes';
import OfferDetails from './OfferDetails';
import QuoteDetails from './QuoteDetails';
import AddOffer from './AddOffer';
import AddQuote from './AddQuote';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <header className="container">
        <nav>
          <ul className='flex-container'>
            <li><Link to="/">Clients</Link></li>
            <li><Link to="/offers">Offers</Link></li>
            <li><Link to="/quotes">Quotes</Link></li>
          </ul>
        </nav>
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Clients />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/clients/add" element={<AddClient />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
          <Route path="/offers/add" element={<AddOffer />} />
          <Route path="/quotes/:id" element={<QuoteDetails />} />
          <Route path="/quotes/add" element={<AddQuote />} />
        </Routes>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
