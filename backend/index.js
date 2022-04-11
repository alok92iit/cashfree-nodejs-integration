if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const ip =require("ip")
const express = require("express");
const { v4: uuid } = require("uuid");
const db =require("./connectDataBase")
const ClientData   =require("./model/clientDetail")
var cors = require("cors");
const app = express();
app.locals.ipAdr = ip.address();
const sdk = require("api")("@cashfreedocs-new/v2#ebj9bj1sl1asf5c6");
app.use(express.json());
app.use(cors());

//Connecting to dataBase
db()


app.post("/create", async (req, res) => {
  
  const order_id=uuid()
  
  await sdk.server("https://api.cashfree.com/pg");
  const response = await sdk
    .CreateOrder(
      {
        customer_details: {
          customer_id: uuid(),
          customer_email: req.body.email,
          customer_phone: req.body.phoneNumber,
        },
        order_meta: {
          return_url:'https://localhost:5566/payment?order_id=${order_id}&order_token=${order_token}'
           //example url "https://b8af79f41056.eu.ngrok.io?order_id={order_id}&order_token={order_token}",
        },
        order_id:order_id,
        order_amount: parseInt(req.body.orderAmount),
        order_currency: "INR",
      },
      {
        "x-client-id": process.env.clientId,
        "x-client-secret": process.env.clientSecret,
        "x-api-version": process.env.apiVersion,
      }
    )
    .then((data) => {
      console.log(data)
      return data;
    })
    .catch((err) => console.error(err));
  res.status(200).json(response.order_token);
});


app.post('/payment',(req,res)=>{

  // if(typeof req != undefined){
    console.log(req.body)
 res.status(200).json(req.body)
  // }   
  // else{
  //   res.status(500)
  // }

})
const port =process.env.port
app.listen(port, () => {
  console.log("server runing at port ",port);
});
