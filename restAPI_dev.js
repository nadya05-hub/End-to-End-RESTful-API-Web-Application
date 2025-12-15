const express = require('express');
const app = express();

const api_routes = require('./api_routes_dev');
app.use('/api', api_routes);

// serve front-end
app.use('/demo', express.static('front_end'));

// test root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
