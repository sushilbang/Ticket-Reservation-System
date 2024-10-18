const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
const port = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/searchTrains'));
app.use('/reservations', require("./routes/reservation"));

app.listen(port, () => {
    console.log(`Server running on port - ${port}`);
});