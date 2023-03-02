const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Genre, validateGenre } = require('../models/genre');


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`A genre with id ${req.params.id} was not found!`);
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send(`A genre with id ${req.params.id} was not found!`);
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    if (!genre) return res.status(404).send(`A genre with id ${req.params.id} was not found!`);
    // if (genres.find(g => g.name.toLowerCase() === req.body.name.toLowerCase())) {
    //     return res.status(400).send('Another genre with this name already exists');
    // }
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findOne({ name: req.body.name });
    if (genre) return res.status(400).send('Genre already exists.');

    genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

module.exports = {
    router: router
    // database: {
    //     createGenre: createGenre
    // }
};