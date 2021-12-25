const User = require("../Models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    passportNumber: req.body.passportNumber,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, data: user, token });
});

//Update Password
//@route PUT api/auth/updatepassword

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("+password");

  //Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, data: user, token });
  //sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler( async(req, res, next) => {
  user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user});
})
