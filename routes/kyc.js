const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validateReqSchema");
const { protect, authorize } = require("../middlewares/auth");

const kycController = require("../controllers/kycController");

router.route("/initateKYC").post(
  protect,
  authorize("user"),
  kycController.initiateKYC
);
module.exports = router;