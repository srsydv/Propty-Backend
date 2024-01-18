const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const p2pController = require("../controllers/p2pController");
const P2PModel = require("../models/P2P");

const advancedResults = require("../middlewares/advancedResults");


router
  .route("/listForSale")
  .post(
    protect,
    authorize("user"),
    p2pController.listForSale
  );

router
  .route("/updateSale/:p2pId")
  .post(
    protect,
    authorize("user"),
    p2pController.updateSale
  );

router
  .route("/cancelSale/:p2pId")
  .post(
    protect,
    authorize("user"),
    p2pController.cancelSale
  );

router
  .route("/buyFromMarketplace/:p2pId")
  .post(
    
    p2pController.buy
  );


router
  .route("/getAllListedProperties")
  .get(
      advancedResults(P2PModel),
      p2pController.getAllListedProperties
    );

router
  .route("/getAllOrders")
  .get(
      protect,
      authorize("user"),
      p2pController.getAllOrders
    );

router
  .route("/getAllOrders")
  .get(
      protect,
      authorize("user", "admin"),
      p2pController.getAllOrders
    );

module.exports = router;