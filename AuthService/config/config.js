module.exports = {
  server: {
    port: process.env.PORT || 3001
  },

  mongo: {
    host: process.env.DB_host || "localhost",
    database: process.env.DB_database || "mydb"
  },

  JWT: {
    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || "speakSuperJWTSecret",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "7d"
  }
};
