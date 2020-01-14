export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://127.0.0.1/micas-test',
  dbOptions: {
    native_parser: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000,
    useUnifiedTopology: true,
  },

  // Secret for token
  secret: 'J^hi_^uwyhAO!bkJ',
}
