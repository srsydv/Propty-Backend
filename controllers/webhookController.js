const asyncHandler = require("../middlewares/async");
const crypto = require("crypto");
const UserModel = require("../models/User");

const saveKYCDataToDb = async (payload, req) => {
    if (payload.event === "verification.accepted") {
      let data = await UserModel.findOneAndUpdate(
        { _id: payload.reference },
        {
          kycEventType: payload.event,
        }
      );
    } else if (payload.event === "request.pending") {
      await UserModel.findOneAndUpdate(
        { _id: payload.reference },
        {
          verification_url: payload.verification_url,
          kycEventType: payload.event,
        }
      );
    } else {
      await UserModel.findOneAndUpdate(
        { _id: payload.reference },
        {
          kycEventType: payload.event,
        }
      );
    }
  };
  
  exports.kycWebhook = asyncHandler(async (req, res, next) => {
    try {
      let payload = req.body;
      const signature = req.get("signature");
  
      const hashed_secret_key = crypto
        .createHash("sha256")
        .update(process.env.SHUFTI_PRO_SECRET_KEY)
        .digest("hex");
  
      const calculated_signature = crypto
        .createHash("sha256")
        .update(payload + hashed_secret_key)
        .digest("hex");
  
      if (signature === calculated_signature) {
        let data = JSON.parse(payload);
        if (!!data.event) {
          await saveKYCDataToDb(data, req);
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  });