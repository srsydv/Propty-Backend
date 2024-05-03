const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");

const PropertyModel = require("../models/Property");

const advancedResults = require("../middlewares/advancedResults");

const propertyController = require("../controllers/propertyController");

router
  .route("/")
  .post(
    protect,
    authorize("admin"),
    propertyController.createProperty
  );

router
.route("/allProperties")
.get(
    // protect, 
    // authorize("user", "admin"), 
    advancedResults(PropertyModel),
    propertyController.getAllProperties
  );

router
  .route("/property/:propertyId")
  .get(
      // protect, 
      // authorize("user", "admin"),
      propertyController.getProperty
    );

router
  .route("/ownerProperties/:walletAddress")
  .get(
      protect, 
      authorize("user","admin"),
      advancedResults(PropertyModel),
      propertyController.ownerProperties
    );

module.exports = router;
