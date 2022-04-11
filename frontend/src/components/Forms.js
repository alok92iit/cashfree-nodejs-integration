import axios from "axios";
import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
const Forms = ({setToken}) => {
    const navigate            =useNavigate()
    const orderAmountInputRef =useRef()
    const nameInputRef        =useRef()
    const emailInputRef       =useRef()
    const phoneNumberInputRef =useRef()

    const inputHandler=async (event)=>{
        event.preventDefault()
        const orderAmount =orderAmountInputRef.current.value.trim()
        const name        =nameInputRef.current.value.trim()
        const email       =emailInputRef.current.value.trim()
        const phoneNumber =phoneNumberInputRef.current.value.trim()
        try{
              console.log({orderAmount,name,email,phoneNumber})
              await axios.post("http://localhost:5566/create" ,{orderAmount,name,email,phoneNumber})
              .then((data)=>{
                console.log(data.data)
                navigate("/casfree/result")
                setToken(data.data)
              }).catch((err)=>{
                console.log(err)
              })
             // navigate("/casfree/result")
             // setToken(response.data)
             // console.log(response.data)
            }
        catch(err){
          console.log(err);
          return
        }
      }
// useEffect(()=>{
//   inputHandler()
// },[])
    return (
    <form className="mainForm ui form container" > 
      <div className="field">
        <label for="orderAmount">Order Amount:</label>
        <input type="number"   placeholder="Order Amount" name="orderAmount" ref={orderAmountInputRef} required/>
      </div>
      <div className="field">
        <label for="name">Name:</label>
        <input type="text" placeholder="Name" name="name"  ref={nameInputRef} required/>
      </div>
      <div className="field">
        <label for="email">Email:</label>
        <input type="email" placeholder="Email" name="email" ref={emailInputRef} required/>
      </div>
      <div className="field">
        <label for="phoneNumber">Phone Number:</label>
        <input type="number" placeholder="Phone Number" name="phoneNumber" ref={phoneNumberInputRef} required/>
      </div>
      <button className="ui button" type="submit" onClick={inputHandler}>
       Checkout
      </button>
    </form>
    );
};

export default Forms;
