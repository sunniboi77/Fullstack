
const { Customer, validate, validateMod } = require('../models/customer');
// Object desctructuring
// const customerModule = require('../models/customer');
// const Customer = customerModule.Customer;
// const validate = customerModule.validate;

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
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
    const { error } = validateMod({ name: req.body.name });
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


module.exports = router; 