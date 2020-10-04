const path = require('path');
const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const usersRouter = require('./routers/user');
const balanceRouter = require('./routers/faimily-balance');
const adminRouter = require('./routers/admin');

const app = express();

//app.use(cors);
app.use(express.json());
app.use(usersRouter);
app.use(balanceRouter);
app.use(adminRouter);

module.exports = app;