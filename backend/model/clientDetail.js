const { Sequelize, DataTypes, Model } = require('sequelize');



const BroomeesClientData = sequelize.define('transactions', {

    id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {//order token
        type: DataTypes.STRING(1024) ,
 },
    total:{
        type:DataTypes.FLOAT(11)
    },
    razorpay_payment_id :{//order id
        type:DataTypes.STRING(1024),
    
    },
    order_status:{// error_code
        type :DataTypes.STRING(45)
    },
    txStatus:{
        type :DataTypes.STRING(45)
    },
    txMsg:{
        type :DataTypes.STRING(45)
    }

});


 BroomeesClientData.sync()
//     .then(() => {
//         console.log('BroomeesClientData Table Created!');
//     })
//     .catch((err) => {
//         console.log('Table not created', err);
//     });


module.exports = BroomeesClientData;