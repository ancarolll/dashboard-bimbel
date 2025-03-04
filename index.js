const express = require('express');
const app = express();
const cors = require('cors');


require('dotenv').config();
const db = require('./config/db');
db;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('public'));

app.use('/api', require('./src/routes/index'));


const port = process.env.PORT || 8080;





app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});