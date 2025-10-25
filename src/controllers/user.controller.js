import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    // Take input from user 
    // Validate user input 
    // check if user already exists : username and email
    // check for images and avatar 
    // upload them to cloudinary - check if correctly uploaded
    // create user object  - create entry in db 
    // remove password and refresh token from response 
    // check for user creation 
    // return res / error

    const { fullName, email, username, password } = req.body
    // console.log("email", email);

    // get all -> trim, if any empty throw error
    if ([fullName, email, password, username].some((field) => { field?.trim() === "" })) {
        throw new ApiError(400, "All fields are required")
    }

    // check if user exists with given username or email
    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with same email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, 'Avatar file is required')
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    // retreiving from db w/o two fields - password and refreshToken
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user ")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User regsitered successfully")
    )

})

export { registerUser }