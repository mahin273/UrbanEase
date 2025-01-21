const express = require('express');
const { serverConfig } = require('./config'); // Assuming serverConfig is in the config folder
const apiRoutes = require('./routes'); // Import your routes
const cors = require('cors');
const app = express();


const corsOptions = {
    origin: 'http://127.0.0.1:8080', // Allow your front-end URL, change this when deploying
    methods: ['GET', 'POST', 'DELETE'], // Allow only the specified HTTP methods
    credentials: true, // Allow cookies and credentials to be sent
};

app.use(cors(corsOptions)); // Enable CORS with your custom options

app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use('/api', apiRoutes); // API route prefix
app.use('/uploads', express.static('uploads')); // Serve uploaded files from 'uploads' folder

// Start the server
app.listen(serverConfig.PORT, () => {
    console.log(`Successfully started on the server on PORT: ${serverConfig.PORT}`);
});
