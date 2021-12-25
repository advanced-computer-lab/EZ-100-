const User = require("../Models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");

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
  
  
  