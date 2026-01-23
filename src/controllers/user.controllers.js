import { upload } from "../middlewares/multer.middleware.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRespone from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js"

const registerUser = AsyncHandler(async (req, res) => {
  // Get data from user
  const { username, fullname, email, password } = req.body

  // Validating data
  if (username.trim() === "") throw new ApiError(400, "username is require")
  if (fullname.trim() === "") throw new ApiError(400, "fullname is require")
  if (email.trim() === "") throw new ApiError(400, "email is require")
  if (password.trim() === "") throw new ApiError(400, "password is require")

  // Check if user aready exist. 
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if (existedUser) throw new ApiError(400, "User is already exists");
  

  //  Get avatar,coverimage-optional // upload file in cloudinary
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverimage?.[0]?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is require");
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) throw new ApiError(400, "Avatar is required");
  let coverimage;
  if (coverImageLocalPath) coverimage = await uploadOnCloudinary(coverImageLocalPath);



  //create user entry
  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    "avatar": avatar.url,
    "coverimage": coverimage?.url || "",
  })
  // crete user obj without password,refreshtoken
  const createUser = await User.findById(user._id).select("-password -refreshToken")
  if (!createUser) throw new ApiError(500, "Someting went wrong while registering the user")

  // return response
  return res.status(201).json(
    new ApiRespone(200, createUser, "User Successfully register ")
  )
})

export default registerUser;