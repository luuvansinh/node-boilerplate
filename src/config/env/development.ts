export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://127.0.0.1/micas-dev',
  dbOptions: {
    autoReconnect: true,
    keepAlive: true,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },

  // Secret for token
  secret: '59)SUIJOc^Apc*W(',

  host: {
    files: 'https://micas-dev.s3-ap-southeast-1.amazonaws.com/',
  },
}
