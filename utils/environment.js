const {
  JWT_SECRET = 'SECRET',
  PORT = 3000,
  DB = 'mongodb://localhost:27017/newsdb',
} = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB,
};
