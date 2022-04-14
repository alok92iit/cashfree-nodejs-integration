if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const ip = require("ip");
const express = require("express");
const { v4: uuid } = require("uuid");
const db = require("./connectDataBase");
const ClientData = require("./model/clientDetail");
var cors = require("cors");
const app = express();
const { validateProduct } = require("./middlewares");
app.locals.ipAdr = ip.address();
const sdk = require("api")("@cashfreedocs-new/v2#ebj9bj1sl1asf5c6");
app.use(express.json());
app.use(cors());

//Connecting to dataBase
//db();

app.post("/create", validateProduct, async (req, res) => {
  try {
    if (req.body.order === undefined) {
      const order_id = uuid();
      //Create OrderToken
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
              notify_url: "https://localhost:5566/create",
              return_url:
                "https://localhost:5566/payment?order_id=${order_id}&order_token=${order_token}",
            },
            order_id: order_id,
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
          //Add client data into database
          // await ClientData.create({
          //   orderId: data.order_token,
          //   total: data.order_amount,
          //   razorpay_payment_id: data.order_id,
          //   order_status: data.order_status,
          // });

          return data;
        })
        .catch((err) => res.status(400));

      res.status(200).json(response.order_token);
    }
    else if (req.body.orderToken) {
      if (typeof req != undefined) {
        // await sequelize.query(
        //   `UPDATE transactions SET order_status = '${req.body.order.status}' ,txStatus='${req.body.transaction.txStatus}', txMsg ='${req.body.transaction.txMsg}' WHERE orderId= '${req.body.orderToken}';`
        // );
        res.status(200).json(req.body);
      } 
    else {
        res.status(400);
      }
    }
  } catch (err) {
    res.status(500);
  }
});

const port = process.env.port;
app.listen(port, () => {
  console.log("server runing at port ", port);
});
