const express = require('express');
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


//route imports
const product = require("./routes/productRoutes");
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');

app.use('/api/v1', product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//middleware for error
app.use(errorMiddleware);


module.exports = app;