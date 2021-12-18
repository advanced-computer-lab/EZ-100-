const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add your first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please add your last name"],
    },

    passportNumber: {
      type: String,
      unique: true,
      required: [true, "Please add your passport number"],
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Please enter a valid Email",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', (async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
}));

userSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

userSchema.methods.matchPassword = async function(enteredPassword){
  console.log(enteredPassword);
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
