const express = require('express');
<<<<<<< HEAD
const routes = require('./routes');
=======
const routes = require('./rotas');
>>>>>>> main

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });

