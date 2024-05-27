const asyncHandler = require("../middlewares/async");
const P2PModal = require("../models/P2P");
const UserModel = require("../models/User");
const PropertyModel = require("../models/Property");

exports.listForSale = asyncHandler(async (req, res, next) => {
    try {
        P2PModal.create(
          {
            ...req.body,
          },
          async (err, doc) => {
            if (err) {
              res.status(401).json({ success: false +err});
            } else {
              if (!!doc) {
                res.status(201).json({
                  success: true,
                  _id: doc._id,
                  message: "Request successfully created",
                });
              } else {
                res
                  .status(400)
                  .json({ success: false, message: "Failed to create Request" });
              }
            }
          }
        );
    } catch (err) {
        res
            .status(401)
            .json({ success: false, message: "Failed to create Request" });
        
    }
});

exports.updateSale = asyncHandler(async (req, res, next) => {
    try {
      const { p2pId } = req.params;
      P2PModal.findOneAndUpdate(
        { _id: p2pId },
        { ...req.body },
        { new: true },
        async (err, docs) => {
            if (err) {
              res.status(400).json({ success: false });
            } else {
              res.status(200).json({ success: true });
            }
          }
      );
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Profile failed to update" });
    }
});

exports.cancelSale = asyncHandler(async (req, res, next) => {
    try {
      const { p2pId } = req.params;
      P2PModal.findOneAndUpdate(
        { _id: p2pId },
        { status: "cancelled" },
        { new: true },
        async (err, docs) => {
            if (err) {
              res.status(400).json({ success: false });
            } else {
              res.status(201).json({ success: true });
            }
          }
      );
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Profile failed to update" });
    }
});

exports.buy = asyncHandler(async (req, res, next) => {
    try {
        const { p2pId } = req.params;
        const { userId, tokensBought } = req.body;
            
        P2PModal.findOneAndUpdate(   //update p2p buyers history 
        { _id: p2pId },
        { 
            $push: {
            buyers: {
                user: userId,
                amount: tokensBought
            },
            }, 
            $inc: { "availableTokens": -tokensBought},
        },
        { new: true },
        async (err, docs) => {
            if (err) {
                res.status(400).json({ 
                success: false ,
                message: "Failed to buy"});
            } else {
                if(docs.availableTokens==0)
                  docs.status="inactive"
                await docs.save();
                const seller = docs.seller.toString();
                const property = docs.property.toString();
                UserModel.findOneAndUpdate(
                    {   _id: seller,
                        "propertyToken.property" : property
                    },
                    {
                        $push: {
                          p2pHistory: {
                                property: property,
                                buyerOrSeller: userId,
                                tokens: tokensBought,
                                status: "Sold"
                            },
                        },
                        $inc: { "propertyToken.$.TotalToken": -tokensBought},
                    },
                    async (err ) =>{
                        if (err) {
                            res.status(400).json({ 
                                success: false ,
                                message: "Failed to update seller Details"});
                        }
                        else{
                            UserModel.findOneAndUpdate(
                                {
                                    _id: userId,
                                },
                                {
                                    $push: {
                                      p2pHistory: {
                                            property: property,
                                            buyerOrSeller: seller,
                                            tokens: tokensBought,
                                            status: "Bought"
                                        },
                                    }, 
                                },
                                async (err ) =>{
                                  if (err) {
                                      res.status(400).json({ 
                                          success: false ,
                                          message: "Failed to update buyer Details"});
                                  }
                                  else{
                                    const data = await UserModel.findOne(
                                      {
                                          _id: userId,
                                          "propertyToken.property" : property
                                      },
                                    )
                                    if(!data){
                                      res
                                            .status(201)
                                            .json({
                                            success: false,
                                            message: "Buyer Data not found"
                                            });
                                    }
                                    else{
                                      let specificPropertyToken = data.propertyToken.find(
                                        x => x.property.toString() === property.toString()
                                      )
                                      if(specificPropertyToken) {
                                          userData = await UserModel.findOneAndUpdate(
                                              { _id: userId,
                                              "propertyToken.property" : property
                                              },
                                              { 
                                              whitelisted: true,
                                              // property: property,
                                              $inc: { "propertyToken.$.TotalToken": tokensBought},
                                              }
                                          );
                                      } 
                                      else {
                                          userData = await UserModel.findOneAndUpdate(
                                          { _id: userId,
                                          },
                                          { 
                                              whitelisted: true,
                                              // property: property,
                                              $push: {
                                              propertyToken: {
                                                  property: property,
                                                  TotalToken: tokensBought,
                                              },
                                              },
                                          }
                                          );
                                      }
                                      if (userData) {
                                          res
                                              .status(201)
                                              .json({
                                              success: true,
                                              message: "Bought successfully"
                                              });
                                      }
                                      else{
                                          res
                                              .status(201)
                                              .json({
                                              success: false,
                                              message: "Failed to update Buyer Details"
                                              });
                                        }
                                    }
                                  }
                                }
                            )
                        }
                    }
                )
            }
        });
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Profile failed to update" });
    }
});

exports.getAllListedProperties = asyncHandler(async (req, res, next) => {
  try {
    const result = await P2PModal.find({}).populate([
      {
        path: "property",
        select: "propertyName mediaLinks assetJurisdiction propertyContractAddress",
      },
    ]).populate([
      {
        path: "seller",
        select: "name",
      },
    ]);
    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {

  try {
    const projection = { p2pHistory: 1 };
    const data = await UserModel.findOne({
      wallet_address : req.user.wallet_address,
    },projection).populate([
      {
        path: "p2pHistory.property",
        select: "propertyName mediaLinks",
      },
    ]).populate([
      {
        path: "p2pHistory.buyerOrSeller",
        select: "name",
      },
    ]);
    if (data) {
      res.status(201).json({
        success: true,
        message: "user data",
        data: data,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No user",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false+err });
  }
});

exports.getUsersListedProperties = asyncHandler(async (req, res, next) => {
  try {
      const { userId } = req.params;
      // const projection = { property: 1, seller: 1, availableTokens: 1, salePrice: 1 ,totalTokens: 1, status: 1};
      const data = await P2PModal.find({
       seller: userId,
    }).populate([
      {
        path: "property",
        select: "propertyName mediaLinks",
      },
    ]).populate([
      {
        path: "seller",
        select: "name",
      },
    ]);
    if (data) {
      res.status(201).json({
        success: true,
        message: "data",
        data: data,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No user",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false+ err });
  }
});

exports.getSaleDetailsById = asyncHandler(async (req, res, next) => {

  try {
    const {p2pId} = req.params;
    const data = await P2PModal.findOne({
      _id : p2pId,
    }).populate([
      {
        path: "property",
        select: "propertyName mediaLinks",
      },
    ]).populate([
      {
        path: "seller",
        select: "name",
      },
    ]).populate([
      {
        path: "buyers.user",
        select: "name profileImage",
      },
    ]);
    
    if (data) {
      res.status(201).json({
        success: true,
        data: data,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No data",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false});
  }
});


exports.getOrderBookByPropertyId = asyncHandler(async (req, res, next) => {

  try {
    const projection = { totalTokens: 1, salePrice:1 };
    const {propertyId} = req.params;

    const dataActive = await P2PModal.find({
      property : propertyId,
      status: "active"
    },projection);

    dataActive.sort((a, b) => a.salePrice - b.salePrice);

    const dataSold = await P2PModal.find({
      property : propertyId,
      status: "inactive"
    },projection);

    if (dataActive && dataSold) {
      res.status(201).json({
        success: true,
        data: {
          dataActive: dataActive,
          dataSold: dataSold
        },
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No data",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false});
  }
});

exports.getp2pHistoryByPropertyId = asyncHandler(async (req, res, next) => {

  try {
    const projection = { totalTokens: 1, salePrice:1, updatedAt: 1 };
    const {propertyId} = req.params;
    const data = await P2PModal.find({
      property : propertyId,
      status: "inactive"
    },projection)
    
    if (data) {
      res.status(201).json({
        success: true,
        data: data,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No data",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false});
  }
});