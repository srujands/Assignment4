const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

// Create a new task
async function createTask(title, description) {
    const [result] = await promisePool.query(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description]
    );
    return result;
}

// Get all tasks
async function getAllTasks() {
    const [rows] = await promisePool.query('SELECT * FROM tasks');
    return rows;
}

// Get a task by ID
async function getTaskById(id) {
    const [rows] = await promisePool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
}

// Update a task by ID
async function updateTask(id, title, description, completed) {
    const [result] = await promisePool.query(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        [title, description, completed, id]
    );
    return result;
}

// Delete a task by ID
async function deleteTask(id) {
    const [result] = await promisePool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result;
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};
