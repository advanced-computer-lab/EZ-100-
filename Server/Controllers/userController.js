const User = require("../Models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.createUser = asyncHandler(async (req,res,next) => {

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  
  const user = await User.create({
    "firstName" : req.body.firstName,
    "lastName" : req.body.lastName,
    "passportNumber" : req.body.passportNumber,
    "dateOfBirth" : req.body.dateOfBirth,
    "gender" : req.body.gender,
    "email" : req.body.email,
    "password": encryptedPassword
  });

  res.status(200).json({ success: true, data: user });
});

exports.editUserInfo = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ErrorResponse(`User with ID ${userID} is not found`, 404));
  }

  res.status(200).json({ success: true, data: user });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User with ID ${userID} is not found`, 404));
  }

  res.status(200).json({ success: true, data: user });
});

// Dummy login --- Delete at sprint 3
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select("+password");
  

  if (!user) {
    return next(
      new ErrorResponse(`User with email ${email} is not found`, 404)
    );
  }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      return res.status(200).json({ success: true, data: user, token});
    }
    else 
      return res.status(400).json({ success: false, data: null, token: null });

  // Compare passwords
  /*let letMeIn = false;
  if (password === user.password) {
    letMeIn = true;
  }*/

  /*if (letMeIn) {
    return res.status(200).json({ success: true, data: user });
  } else {
    return res.status(400).json({ success: false, data: null });
  }*/
});
