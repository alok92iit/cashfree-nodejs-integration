const Joi = require('joi')
module.exports.schema=Joi.object({
    order_amount: Joi.number().min(1).integer(),
    customer_email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    mobileNumber: Joi.number().min(6000000000).max(9999999999).required()
})