const express = require('express');
const { serverConfig } = require('./config'); // Assuming serverConfig is in the config folder
const apiRoutes = require('./routes'); // Import your routes
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:5174', // Allow all origins for now (you can restrict to a specific URL like 'http://localhost:5173' later)
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    credentials: true, // Allow cookies and credentials to be sent
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes); 

// Start the server
app.listen(serverConfig.PORT, () => {
    console.log(`Successfully started on the server on PORT: ${serverConfig.PORT}`);
});
