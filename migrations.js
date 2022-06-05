const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

class Client extends Model {};

Client.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    img: {
        type: DataTypes.STRING,
        defaultValue: "user.png"
    }
  }, {
    sequelize,
    modelName: 'Client',
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    underscored: true
});

class Offer extends Model {};

Offer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    offer_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT('tiny'),
        allowNull: true
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    exp_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Offer',
    timestamps: false,
    underscored: true
});

class Quote extends Model {};

Quote.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quote_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT('tiny'),
        allowNull: true
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    exp_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Quote',
    timestamps: false,
    underscored: true 
});

const Client_Offer = sequelize.define('ClientOffer', {}, {
    sequelize,
    timestamps: false,
    underscored: true
});

Client.belongsToMany(Offer, { through: Client_Offer });
Offer.belongsToMany(Client, { through: Client_Offer });
Client.hasMany(Quote);
Quote.belongsTo(Client, { foreignKey: {
    name: 'client_id',
    allowNull: false
}});

sequelize.sync();

module.exports = {
    sequelize,
    Client,
    Offer,
    Quote
};