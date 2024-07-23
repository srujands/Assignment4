const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3006;

// Middleware
app.use(bodyParser.json());

// Routes
const taskRoutes = require('./router');

app.use('/tasks', taskRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
