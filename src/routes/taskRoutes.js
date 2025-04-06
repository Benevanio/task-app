const express = require('express');
const routerTask = express.Router();

const TaskSchema = require('../model/taskModel');
const authMiddleware = require('../middlewares/authMiddleware');

routerTask.post('/tasks',authMiddleware, async (req, res) => {
    
    const { title, description, completed } = req.body;
    try {
        const task = new TaskSchema({ title, description, completed });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: 'Error creating task', error });
    }
    });
routerTask.get('/tasks',authMiddleware, async (req, res) => {
    if(req.query.completed) {
        const completed = req.query.completed === 'true';
        try {
            const tasks = await TaskSchema.find({ completed });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching tasks', error });
        }
        return;
    }
    if(req.query.title) {
        const title = req.query.title;
        try {
            const tasks = await TaskSchema.find({ title: { $regex: title, $options: 'i' } });
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching tasks', error });
        }
        return;
    }
    try {
        const tasks = await TaskSchema.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks', error });
    }
}
);

routerTask.delete('/tasks/:id',authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await TaskSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task', error });
    }
}
);

routerTask.patch('/tasks/:id',authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = await TaskSchema.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' , error});
    }
}
);



module.exports = routerTask;