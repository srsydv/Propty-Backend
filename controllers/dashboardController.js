const UserModel = require("../models/User");
const PropertyModel = require("../models/Property");
const asyncHandler = require("../middlewares/async");

exports.globalSearch = asyncHandler(async (req, res, next) => {
  try {
    const { q } = req.query;
    if (q !== "") {

        const userData = await UserModel.find({
            $and: [
                {
                  $or: [
                    { name: { $regex: q, $options: "i" } },
                    { username: { $regex: q, $options: "i" } },
                  ],
                },
                { role: { $ne: "admin" } },
              ],
        }).select("_id name username profileImage");
      
        const propertyData = await PropertyModel.find({
            propertyName: { $regex: q, $options: "i" },
        }).select("_id propertyName mediaLinks");


      res.status(200).json({
        success: true,
        data: {
          user: userData,
          property: propertyData,
        },
      });
    } else {
      res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
});