
export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://127.0.0.1/micas',
  dbOptions: {
    useNewUrlParser: true,
    autoReconnect: true,
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },

  // Secret for user token
  secret: process.env.USER_TOKEN_SECRET,
}
