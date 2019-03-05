module.exports = {
  server: {
    port: process.env.PORT || 3002
  },
  serviceRegistry: "http://localhost:3006/registry/searchByName",

  mongo: {
    host: process.env.DB_host || "localhost",
    database: process.env.DB_database || "mydb"
  }
};
