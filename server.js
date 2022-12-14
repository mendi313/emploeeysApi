const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = 3500;
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/employees', require('./api/employees'));
app.use('/register', require('./api/register'));
app.use('/auth', require('./api/auth'));
app.use(logger);
app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('coonected to mongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
