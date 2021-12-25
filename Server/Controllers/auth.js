const User = require("../Models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

// @desc:    Forgot password
//@route:    POST /api/v1/auth/forgotpassword
//@access:   public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ErrorResponse(`No user with email: ${req.body.email}`, 404)
    );
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset Url
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/resetpassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested to reset the password.. Please make a PUT request to \n\n ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      text: message,
    });

    return res.status(200).json({ Success: true, data: "Email Sent" });
  } catch (error) {
    console.log(error);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponce(`Email could not be sent`, 500));
  }
});

// @desc:    Reset password
//@route:    PUT /api/v1/auth/resetpassword/:resetToken
//@access:   public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  // Search for user by the resetToken
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, data: user, token });
});
