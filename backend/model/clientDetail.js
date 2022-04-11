const { Sequelize, DataTypes, Model } = require('sequelize');



const BroomeesClientData = sequelize.define('client_data', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true

    },
    mobileNo: {
        type: DataTypes.BIGINT(10),
        allowNull: false,
    },
    orderID :{
        type:DataTypes.STRING(32),
        allowNull: false,
    }

});


BroomeesClientData.sync()
    .then(() => {
        console.log('BroomeesClientData Table Created!');
    })
    .catch((err) => {
        console.log('Table not created', err);
    });


module.exports = BroomeesClientData;