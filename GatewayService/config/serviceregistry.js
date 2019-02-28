//It is stored as config file in this project. It could handle differently. It could store in the database, it could store database and then can cache on server startup.
module.exports = {
  repository: {
    authService: "http://localhost:3001",
    membersService: "http://localhost:3002",
    giftsService: "http://localhost:3003",
    logService: "http://localhost:3004"
  }
};
