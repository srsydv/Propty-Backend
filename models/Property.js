const mongoose = require("mongoose");

const rentHistorySchema = new mongoose.Schema(
  {
    amount: Number,
  },
  { timestamps: true }
);

const withdrawEarningSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
        amount: Number,
        withdrawnInstallment: Number,
    },
    { timestamps: true }

);

const PropertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  chainId: {
    type: Number,
  },
  mediaLinks: {
    type: [
      {
      mediaType: { type: String, enum: ["image", "video", "audio"] },
      mediaLink: String,
      }
    ],
  },
  assetJurisdiction: {
    address: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  propertyOwner: {
    name: {
      type: String,
    },
    profileImage: {
      type: String,
    }
  },
  propertyIssuer: {
    name: {
      type: String,
    },
    profileImage: {
      type: String,
    }
  },
  propertyValidator: {
    name: {
      type: String,
    },
    profileImage: {
      type: String,
    }
  },
  supportingDocuments:  {
    type: [
      {
      name: { type: String },
      link: { type: String },
      }
    ],
  },
  about: {
    type: String,
  },
  attributes: [
    {
      key: String,
      value: String,
    },
  ],
  fairMarketValue: {
    type: Number,
  },
  totalInvestment: {
    type: Number,
  },
  underlyingAssetPrice: {
    type: Number,
  },
  upfrontDaoLlcFees: {
    type: Number,
  },
  operatingReserve: {
    type: Number,
  },
  closingCost: {
    type: Number,
  },
  tokenizationFees: {
    type: Number,
  },
  totalTokens: {
    type: Number,
  },
  minInvestment: {
    type: Number,
  },
  maxInvestment: {
    type: Number,
  },
  amountRaised: {
    type: Number,
  },
  grossRentPerMonth: {
    type: Number,
  },
  grossRentPerYear: {
    type: Number,
  },
  monthlyCosts: {
    type: Number,
  },
  maintenanceExpenses: {
    type: Number,
  },
  propertyTaxes: {
    type: Number,
  },
  insurance: {
    type: Number,
  },
  utilities: {
    type: Number,
  },
  propertyManagement: {
    type: Number,
  },
  propTyPlatform: {
    type: Number,
  },
  rentalType: {
    type: String,
  },
  rentStartDate: {
    type: Date,
  },
  rentSubsidy: {
    type: String,
  },
  rented: {
    type: String,
  },
  rentpayingDuration: {
    type: String,
  },
  tenure: {
    type: String,
  },
  projectedAppreciation: {
    type: Number,
  },
  netRentPerMonth: {
    type: Number,
  },
  netRentPerYear: {
    type: Number,
  },
  projectedRentalYield: {
    type: Number,
  },
  projectedAnnualYield: {
    type: Number,
  },

  propertyOwnerWalletAddress : String,
  // propertyCreatorWalletAddress : String,

  availableTokens: {
    type: Number,
  },  
  propertyContractAddress: {
    type: String, 
    unique: true,
  },
  contract: {
    type: String,
  },
  propertyId: {
    type: Number, 
    unique: true,
  },
  totalPrice: {
    type: Number,
  },
  tokenPrice: {
    type: Number,
  },
  rentPerToken: {
    type: Number,
  },
  expectedIncome: {
    type: Number,
  },
  offeringPercent: {
    type: Number,
  },

  rentReceived: {
    type: Number,
  },
  totalRentPaid: {
    type: Number,
  },
  rentInstallment: {
    type: Number,
  },
  rentHistory: [rentHistorySchema],
  withdrawHistory : [withdrawEarningSchema],

});

module.exports = mongoose.model("Property", PropertySchema);
