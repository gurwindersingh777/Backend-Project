import jwt  from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJWT = AsyncHandler(async (req, res, next) => {

  const token = req.cookies.refreshToken;
  
  if (!token) {
    throw new ApiError(401, "Unauthorized")
  }

  try {
    const decordedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    
    const user = await User.findById(decordedToken?._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(404, "Unauthorized")
    }
    
    req.user = user;
    next()
  } catch (error) {
      throw new ApiError(400,"ïnvalid access token")
  }
})

export default verifyJWT;
