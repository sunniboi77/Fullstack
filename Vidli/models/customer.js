const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: { type: Boolean, default: false },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required().empty(),
        phone: Joi.string().length(5).pattern(/^[0-9]+$/).required(),
        isGold: Joi.boolean().required()
    })
    const validation = schema.validate(customer);
    return validation;
}

//validation for put request only
function validateCustomerMod(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required().empty(),
    })
    const validation = schema.validate(customer);
    return validation;
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.validateMod = validateCustomerMod;