const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/blogapp';

module.exports = {
  mongoURI: mongoURI,
  // You can add other database-related configurations here
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
};