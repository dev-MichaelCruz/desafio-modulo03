const express = require('exoress');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) });

