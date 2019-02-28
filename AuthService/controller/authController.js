const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.getToken = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  //verify user/password is passed in the body
  //we could use some validator service (e.g. express-validator) here
  if (!userName || !password) {
    let error = new Error("User or Password is missing.");
    error.status = 202;
    throw error;
  }

  //it needs to be changed to pull user from the table and then verify against it
  if (userName != "bhavesh" || password != "12345678") {
    let error = new Error("User or Password is Invalid.");
    error.status = 202;
    throw error;
  }

  //payload of jwt can be changed as per the requirement
  const generatedToken = jwt.sign(
    {
      userName: userName,
      generatedBy: "AuthService"
    },
    config.JWT.JWT_ENCRYPTION,
    {
      expiresIn: config.JWT.JWT_EXPIRATION
    }
  );

  res.status(200).json({
    code: 200,
    token: generatedToken
  });
};
