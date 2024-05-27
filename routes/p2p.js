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
    protect,
    authorize("user"),
    p2pController.buy
  );


router
  .route("/getAllListedProperties")
  .get(
    protect,
    authorize("user"),
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
  .route("/getUsersListedProperties/:userId")
  .get(
      protect,
      authorize("user"),
      p2pController.getUsersListedProperties
    );
    
router
  .route("/getSaleDetailsById/:p2pId")
  .get(
      protect,
      authorize("user"),
      p2pController.getSaleDetailsById
    );

router
  .route("/getOrderBookByPropertyId/:propertyId")
  .get(
      protect,
      authorize("user","admin"),
      p2pController.getOrderBookByPropertyId
    );
router
  .route("/getp2pHistoryByPropertyId/:propertyId")
  .get(
      protect,
      authorize("user","admin"),
      p2pController.getp2pHistoryByPropertyId
    );   
module.exports = router;