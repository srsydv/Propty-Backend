const { body } = require("express-validator");

const userOnBoardReqSchema = [
    body("name", "The name field is required").notEmpty(),
    body("username", "The username field is required").notEmpty(),
    body("email", "The email field is required").notEmpty(),
  ];


module.exports = {
  userOnBoardReqSchema
};