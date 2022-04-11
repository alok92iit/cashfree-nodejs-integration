import axios from 'axios'
import React, { useEffect } from 'react'
import { cashfreeSandbox, cashfreeProd } from 'cashfree-dropjs';
import { useNavigate } from 'react-router-dom'; 

const PaymentStatus = ({orderToken,setorderDetail}) => {
    const navigate =useNavigate()
    console.log(orderToken)
    const components= ["order-details", "card", "upi", "app", "netbanking", "paylater", "credicardemi"]
    const cbs = (orderdData) => {
  
      if (orderdData.order && orderdData.order.status === 'PAID') {
        console.log(orderdData)
        setorderDetail(orderdData)
        navigate("/transectionDetial")
      }
    };
    const cbf = (orderdData) => {
      console.log(orderdData)
      navigate("/");
      return 
    };
   
    const renderDropin = async() => {
      if (orderToken === '') {

        navigate("/");
        return 
      }
      let parent = document.getElementById('drop_in_container');
      parent.innerHTML = '';
      let cashfree;
   //   if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
      // } else {
    //    cashfree = new cashfreeSandbox.Cashfree();
      // }
      console.log('before Initialisation');
      await cashfree.initialiseDropin(parent, {
        orderToken,
        onSuccess: cbs,
        onFailure: cbf,
        components,
      });
      console.log('after Initialisation');
    };
    
    useEffect(()=>{
        renderDropin()
    },[orderToken])
  return (
    <div id='drop_in_container'></div>
  )
}

export default PaymentStatus