'use strict';
const mongoose = require('mongoose');
const validator = require('validator');
1
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                return value.length >= 3;
            },
            message: (props) => `Name must be at least 3 characters long! ${props.value}`,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
            validator: (value) => {
                return value.length >= 6;
            },
            message: (props) => `Password must be at least 6 characters long! ${props.value}`,

        },

    },
})

module.exports = mongoose.model('User', userSchema);