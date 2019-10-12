require('express-group-routes');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

// Routes
const userRoutes = require('./routes/user');

app.use(express.json());

app.group('/api/v1', (router) => {
  router.get('/', (req, res) => res.json({ msg: 'Connected to Express' }));

  router.use('/user', userRoutes);
});

app.listen(port, () => console.log('App listening on port', port));