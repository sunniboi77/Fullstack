const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required().empty(),
        description: Joi.string()
    })
    const validation = schema.validate(genre);
    return validation;
}

exports.Genre = Genre;
exports.validateGenre = validateGenre;
