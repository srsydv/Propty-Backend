const mongoose = require("mongoose");

const withdrawEarningSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
  },
      amount: Number,
      withdrawnInstallment: Number,
  },
  { timestamps: true }

);

const rentSchema = new mongoose.Schema(
  {
    amount: Number,
    status: {
      type: String,
      enum: ["none", "withdrawn"],
      default: "none",
    },
    grossRentPerMonth: Number,
  },
  { timestamps: true }
);

const p2pHistorySchema = new mongoose.Schema(
  { 
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
    },
    buyerOrSeller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    tokens: Number,
    status: {
      type: String,
      enum: ["Sold", "Bought"],
    },
  },
  { timestamps: true }
);

const propertyTokenSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
    },
    TotalToken: Number,
    rent: [rentSchema]
  },
  { timestamps: true }

);

const UserSchema = new mongoose.Schema(
  {
    wallet_address: {
      type: String,
      unique: true,
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
  },
    name: String,
    username: { type: String },
    email: {
      type: { type: String },
    },
    whitelisted: {
      type: Boolean,
      default: false,
    },
    bio: String,
    role: {
      type: String,
      default: "user",
    },
    signatureMessage: {
      type: String,
    },
    socialLinks: {
      website: String,
      twitter: String,
      discord: String,
      telegram: String,
      instagram: String,
      other: String,
    },
    termOfService: {
      type: Boolean,
      // default: false
    },
    profileImage: String,
    bannerImage: String,
    verification_url: String,
    kycEventType: String,
    reviewStatus: String,
    withdrawnHistory: [withdrawEarningSchema],
    propertyToken : [propertyTokenSchema],
    p2pHistory: [p2pHistorySchema],
    totalRentEarned: Number,
    rentBalance: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
