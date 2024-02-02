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
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
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
  supportingDocuments: {
    propertyAssessmentDocument: String,
    certificateOfFormation: String,
    operatingAgreement: String,
    purchaseContract: String,
    rentAndLeaseTerms: String,
    operatingExpensesTaxReceit: String,
    pestReport: String,
    jurisdictionPermission: String,
    provincialIncorporation: String,
  },
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
  fairMarketValue: {
    type: Number,
    required: true,
  },
  totalInvestment: {
    type: Number,
    required: true,
  },
  underlyingAssetPrice: {
    type: Number,
    required: true,
  },
  upfrontDaoLlcFees: {
    type: Number,
    required: true,
  },
  operatingReserve: {
    type: Number,
    required: true,
  },
  closingCost: {
    type: Number,
    required: true,
  },
  tokenizationFees: {
    type: Number,
    required: true,
  },
  pricePerToken: {
    type: Number,
    required: true,
  },
  totalTokens: {
    type: Number,
    required: true,
  },
  minInvestment: {
    type: Number,
    required: true,
  },
  maxInvestment: {
    type: Number,
    required: true,
  },
  amountRaised: {
    type: Number,
    required: true,
  },
  grossRentPerMonth: {
    type: Number,
    required: true,
  },
  grossRentPerYear: {
    type: Number,
    required: true,
  },
  monthlyCosts: {
    type: Number,
    required: true,
  },
  maintenanceExpenses: {
    type: Number,
    required: true,
  },
  propertyTaxes: {
    type: Number,
    required: true,
  },
  insurance: {
    type: Number,
    required: true,
  },
  utilities: {
    type: Number,
    required: true,
  },
  propertyManagement: {
    type: Number,
  },
  propTyPlatform: {
    type: Number,
  },
  rentalType: {
    type: String,
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
  rented: {
    type: String,
    required: true,
  },
  rentpayingDuration: {
    type: String,
    required: true,
  },
  tenure: {
    type: String,
    required: true,
  },
  projectedAppreciation: {
    type: Number,
    required: true,
  },
  netRentPerMonth: {
    type: Number,
    required: true,
  },
  netRentPerYear: {
    type: Number,
    required: true,
  },
  projectedRentalYield: {
    type: Number,
    required: true,
  },
  projectedAnnualYield: {
    type: Number,
    required: true,
  },

  propertyOwnerWalletAddress : String,
  // propertyCreatorWalletAddress : String,

  availableTokens: {
    type: Number,
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

  
  // totalPrice: {
  //   type: Number,
  //   required: true,
  // },
  // rentPerToken: {
  //   type: Number,
  //   required: true,
  // },
  

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
