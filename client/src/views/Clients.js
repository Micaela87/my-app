import React from 'react';
import { Link } from "react-router-dom";
import { getAllData } from '../utils/helperFunctions';

class Clients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: []
        }
    }

    componentDidMount() {
        getAllData('http://localhost:3000/clients').then(clients => {
            if (clients.length) {
                this.setState({ clients }); 
            }
        });
    }

    renderClients() {
        return this.state.clients.map(client => {
            return (
                <Link to={`/clients/${client.id}`}
                    className="item"
                    key={client.id}>
                    <h3>{client.firstname}  {client.lastname}</h3>
                    <img src={require(`../../public/storage/img/${client.img}`)} alt={client.firstname}/>
                </Link>
            );
        });
    }
    render() {
        return (
            <div className="container">
                <h1>Clients</h1>
                <div className="item-list flex-container">
                    {this.renderClients()}
                </div>
                <Link to="/clients/add"><button>Add a new client</button></Link>
            </div>
        );
    }
    
}

export default Clients;