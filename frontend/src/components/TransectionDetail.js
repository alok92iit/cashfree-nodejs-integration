import axios from "axios";
import React, { useEffect } from "react";

const TransectionDetail = ({orderDetail}) => {
   console.log(orderDetail)
  const fetchTransectionDetails = async () => {
    const response = await axios.post("http://localhost:5566/payment", orderDetail)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    console.log(response);
    return response;
  };

  useEffect(() => {
    fetchTransectionDetails();
  }, []);

  return (
    <div className="container">
    <table className="ui  green table">
    <thead>
      <tr>
         <h2>Payment Sucessful</h2>
      </tr>
    </thead>
         <tbody>
      <tr>
        <td>Order ID</td>
        <td>{orderDetail.order.orderId}</td>
      </tr>
      <tr>
        <td>Order Status</td>
        <td>{orderDetail.order.status}</td>
      </tr>
      <tr>
        <td>Transection Id</td>
        <td>{orderDetail.transaction.transactionId}</td>
      </tr>
      <tr>
        <td>Transection Amount</td>
        <td>{orderDetail.transaction.transactionAmount}</td>
      </tr>
    </tbody>
 </table>
 </div>
  );
};

export default TransectionDetail;
