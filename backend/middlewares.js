const {schema} = require("./JoiSchema")

module.exports.validateProduct=(req, res, next) => {


                if(req.body.orderToken===undefined){


                                    let {orderAmount,email,phoneNumber} =req.body
                                    const {error}=  schema.validate({order_amount:orderAmount,customer_email:email,mobileNumber:phoneNumber})
                    //   console.log(value)
                                
                                    if(error){

                                        console.log("sdfghyrefwgrthgdshtrdxft ")
                                    const msg = error.details.map((err)=>err.message).join(',')
                                        res.status(400).json({data:msg})
                                    }
                                    
                                    else{
                                        next()
                                    }
                                }
                else{
                    next()
            
                }
            }