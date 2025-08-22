const mongoose = require("mongoose");

const Buyers = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      
        amount: Number,
        // withdrawnInstallment: Number,
    },
    { timestamps: true }

);
const P2PSchema = new mongoose.Schema(
    {
    property: {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
        required: true,
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    buyers: [Buyers],
    status: {
        type: String, enum: ["active", "inactive", "cancelled"],
        default: "active" 
    },
    availableTokens: {
        type: Number,
        required: true,
    },
    totalTokens: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    // pricePerToken: {
    //     type: Number,
    // },
    // tokenValue: {
    //     type: Number,
    // },
    _saleId: {
        type: Number,
        required: true,
    }
    },
    { timestamps: true }
);

module.exports = mongoose.model("P2P", P2PSchema);