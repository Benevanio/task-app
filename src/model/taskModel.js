'use strict';
const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                return value.length >= 3;
            },
            message: (props) => `Title must be at least 3 characters long! ${props.value}`,
        },
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;