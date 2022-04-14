import axios from "axios";
import React, { useEffect } from "react";

const TransectionDetail = ({orderDetail}) => {
   console.log(orderDetail)
  const fetchTransectionDetails = async () => {
              if(orderDetail!=={}){
                    const response = await axios.post("http://localhost:5566/payment", orderDetail)
                    .then((data) => {
                      return data;
                    })
                    .catch((err) => {
                      return err;
                    });
                    return response;
                  }
              
                 // console.log(response);
   
  };

  useEffect(() => {
  //  fetchTransectionDetails()
  }, []);

  return (
    <div className="container">
    {
    orderDetail? 
    <center>
   <h2>Payment Status</h2>
   <p>Oops....You did not Purchase Anything Yet  !!!</p>
 </center>

:<table className="ui  green table">
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

}
 </div>
  );
};

export default TransectionDetail;
