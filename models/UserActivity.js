const mongoose = require("mongoose");

const UserActivity = new mongoose.Schema(
  {
    userAddress: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    property: {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
    },
    assetCollection: {
      type: mongoose.Schema.ObjectId,
      ref: "Collection",
    },
    token: String,
    statusText: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserActivity", UserActivity);
