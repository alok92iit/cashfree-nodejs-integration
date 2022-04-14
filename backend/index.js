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
const {validateProduct} =require("./middlewares")
app.locals.ipAdr = ip.address();
const sdk = require("api")("@cashfreedocs-new/v2#ebj9bj1sl1asf5c6");
app.use(express.json());
app.use(cors());

//Connecting to dataBase
  db()



app.post("/create", validateProduct,async (req, res) => {                                                   
    try{
        if(req.body.order===undefined){
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
                                        notify_url: 'https://localhost:5566/create',
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
                                  .then(async (data) => {
                                  //  console.log(data)
                              //     console.log({id: 12,userId: 1,orderId: data.order_token,total: data.order_amount,razorpay_payment_id:order_id ,error_code:"waiting"})
                                //    const {queryData} ={orderId: data.order_toke,total: data.order_amount,razorpay_payment_id:order_id ,error_code:"waiting"}
                                  await ClientData.create({orderId: data.order_token,total: data.order_amount ,razorpay_payment_id:data.order_id,order_status:data.order_status});
                                  //  await ClientData.save()
                                    return data;
                                  })
                                  .catch((err) =>res.status(400));
                                  console.log(response)
                                res.status(200).json(response.order_token);
                                }
              
                              
     else if(req.body.orderToken) {
    console.log("else block")
    if(typeof req != undefined){
      const {orderId,status}={orderId:req.body.order.orderId,status:req.body.order.status}
      // const data= await ClientData.update({orderId: req.body.orderToken,total: req.body.transaction.transactionAmount,razorpay_payment_id:req.body.order.orderId ,error_code:req.body.order.status},{
      //    where: x
      //    {orderToken: req.body.orderToken}
      //  })
      await sequelize.query(`UPDATE transactions SET order_status = '${req.body.order.status}' ,txStatus='${req.body.transaction.txStatus}', txMsg ='${req.body.transaction.txMsg}' WHERE orderId= '${req.body.orderToken}';`);
      // await ClientData.create({orderId: req.body.orderToken,total: req.body.transaction.transactionAmount,razorpay_payment_id:req.body.order.orderId ,error_code:req.body.order.status});
      console.log("Payment response")
  
      console.log(req.body)

      res.status(200).json(req.body)
    }   
    else{
      res.status(400)
    }
  }
}
  catch(err){
    console.log(err)
    res.status(500)
  }
});


app.post('/payment',async(req,res)=>{
  
  // if(typeof req != undefined){
  //   const {orderId,status}={orderId:req.body.order.orderId,status:req.body.order.status}
  //   const data= await ClientData.update({orderId: req.body.orderToken,total: req.body.transaction.transactionAmount,razorpay_payment_id:req.body.order.orderId ,error_code:req.body.order.status},{
  //      where: 
  //      {orderToken: req.body.orderToken}
  //    })
  //   // await ClientData.create({orderId: req.body.orderToken,total: req.body.transaction.transactionAmount,razorpay_payment_id:req.body.order.orderId ,error_code:req.body.order.status});
  //   console.log("Payment response")

    console.log(req.body)
    console.log(data)
    res.status(200)
  // }   
  // else{
  //   res.status(500)
 // }

})
const port =process.env.port
//
app.listen(port, () => {
  console.log("server runing at port ",port);
});
// }
// catch(err){
//   console.error(err)
// }