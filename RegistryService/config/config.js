module.exports = {
  server: {
    port: process.env.PORT || 3006
  },

  mongo: {
    host: process.env.DB_host || "localhost",
    database: process.env.DB_database || "mydb"
  }
};
