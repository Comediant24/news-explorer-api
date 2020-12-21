require('dotenv').config();

const {
  PORT, JWT_SECRET, MONGOOSE_DB_URL, NODE_ENV,
} = process.env;

const ENV_PORT = PORT || 3000;
const JWT_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'dev-secret';
const DB_URL = MONGOOSE_DB_URL || 'mongodb://localhost:27017/newsdb';

const MONGOOSE_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  ENV_PORT, JWT_KEY, DB_URL, MONGOOSE_CONFIG,
};
