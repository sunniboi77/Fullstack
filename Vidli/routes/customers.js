const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { boolean } = require("joi");


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

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateCustomer(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = await Customer.findOne({ name: req.body.name });
        if (customer) return res.status(400).send('Customer already exists.');

        customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold

        });
        console.log(customer);
        customer = await customer.save();
        res.send(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//update name only 
router.put('/:id', async (req, res) => {
    const { error } = validateCustomerMod({ name: req.body.name });
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!customer) return res.status(404).send(`A customer with id ${req.params.id} was not found!`);
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send(`A customer with id ${req.params.id} was not found!`);
    res.send(customer);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required().empty(),
        phone: Joi.string().length(5).pattern(/^[0-9]+$/).required(),
        isGold: Joi.boolean().required()
    })
    const validation = schema.validate(customer);
    return validation;
}


function validateCustomerMod(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required().empty(),
    })
    const validation = schema.validate(customer);
    return validation;
}

// module.exports = {
//     router: router
//     // database: {
//     //     createGenre: createGenre
//     // }
// };

// exports.Customer = Customer;
// exports.validate = validateCustomer; 

module.exports = router; 