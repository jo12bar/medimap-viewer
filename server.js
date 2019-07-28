const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Enable HTML template middleware
app.engine('html', require('ejs').renderFile);

app.use(express.static('static'));

app.get('/', (req, res) => res.render('index.html'));

const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
