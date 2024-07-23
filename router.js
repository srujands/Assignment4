const express = require('express');
const router = express.Router();
const taskModel = require('./models');

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await taskModel.createTask(title, description);
        res.status(201).json({ id: result.insertId, title, description });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await taskModel.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const result = await taskModel.updateTask(req.params.id, title, description, completed);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await taskModel.deleteTask(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
