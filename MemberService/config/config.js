module.exports = {
  server: {
    port: process.env.PORT || 3002
  },

  mongo: {
    host: process.env.DB_host || "localhost",
    database: process.env.DB_database || "mydb"
  }
};
