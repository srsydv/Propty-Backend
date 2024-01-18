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
  mediaLinks: {
    type: [
      {
      mediaType: { type: String, enum: ["image", "video", "audio"] },
      mediaLink: String,
      }
    ],
    required: true,
  },
  assetJurisdiction: {
    country: {
      type: String,
      required: true,
    },
    area: String,
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
  propertyOwnerWalletAddress : String,
  propertyCreatorWalletAddress : String,
  about: {
    type: String,
    required: true,
  },
  attributes: [
    {
      key: String,
      value: String,
    },
  ],
  totalTokens: {
    type: Number,
    required: true,
  },
  availableTokens: {
    type: Number,
    required: true,
  },  
  tokenPrice: {
    type: Number,
    required: true,
  },
  maxInvestment: {
    type: Number,
    required: true,
  },
  minInvestment: {
    type: Number,
    required: true,
  },
  offeringPercent: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    required: true,
  },
  rentPerToken: {
    type: Number,
    required: true,
  },
  rentStartDate: {
    type: Date,
    required: true,
  },
  rentSubsidy: {
    type: String,
    required: true,
  },
  expectedIncome: {
    type: Number,
    required: true,
  },
  rentalType: {
    type: String,
    required: true,
  },
  rented: {
    type: String,
    required: true,
  },
  rentpayingDuration: {
    type: String,
    required: true,
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
  grossRentPerYear: {
    type: Number,
    required: true,
  },
  grossRentPerMonth: {
    type: Number,
    required: true,
  },
  monthlyCosts: {
    type: Number,
    required: true,
  },
  propertyManagement: {
    type: Number,
  },
  aconomyPlatform: {
    type: Number,
  },
  maintenanceExpenses: {
    type: Number,
  },
  propertyTaxes: {
    type: Number,
  },
  insurance: {
    type: String,
  },
  utilities: {
    type: String,
  },
  netRentPerMonth: {
    type: Number,
    required: true,
  },
  netRentPerYear: {
    type: Number,
    required: true,
  },
  totalInvestment: {
    type: Number,
    required: true,
  },
  underlyingAssetPrice: {
    type: Number,
  },
  operatingExpenseReimbursement: {
    type: Number,
  },
  initialMaintenanceReserve: {
    type: Number,
  },
  initialRenovationReserve: {
    type: Number,
  },
  administrativeFees: {
    type: Number,
  },
  miscellaneousCosts: {
    type: Number,
  },
  unroundedListingPrice: {
    type: Number,
  },
  roundingDifference: {
    type: Number,
  },

  // expectedIncome: {
  //   type: Number,
  //   required: true,
  // },

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
