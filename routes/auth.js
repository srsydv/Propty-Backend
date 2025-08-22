const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.route("/:wallet_address/nonce").get(authController.generateNonce);
router
  .route("/:wallet_address/signature")
  .post(authController.validateSignature);
module.exports = router;
