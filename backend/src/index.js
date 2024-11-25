const express = require('express');
const { serverConfig } = require('./config'); // Assuming serverConfig is in the config folder
const apiRoutes = require('./routes'); // Import your routes

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes); 

// Start the server
app.listen(serverConfig.PORT, () => {
    console.log(`Successfully started on the server on PORT: ${serverConfig.PORT}`);
});
