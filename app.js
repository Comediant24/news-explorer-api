const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const { ENV_PORT, DB_URL, MONGOOSE_CONFIG } = require('./utils/config');

const app = express();
mongoose.connect(DB_URL, MONGOOSE_CONFIG);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(notFound);
app.use(errorHandler);

app.listen(ENV_PORT);
