const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SChema for users
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      // more specific email validation
      if (!validator.isEmail(value)) {
        throw new Error("email is not valid");
      }
    },
  },
      token: {
        type: String,
        required: true,
      },
});


userSchema.virtual("Todo", {
    ref: "User",
    localField: "_id",
    foreignField: "User"
});


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    // get current user
    const token = jwt.sign({ _id: user._id.toString() }, "secret");
    // jwt token has to be the same
    //@@ create the token with the .sign
    user.tokens = user.tokens.concat({ token }); // current user tokens are stored
    await user.save(); // save the token to schema

    return token;
};


// statics will be model methods
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    // find the user with the email passed in
    if (!user) {
        throw new Error("Unable to login");
    }
    const isMatch = await bycrypt.compare(password, user.password);
    // matches the hashed password to log the user in
    if (!isMatch) {
        throw new Error("Unable to login");
    }
    return user;
    // if there is a match
};


// Hash the plain password
userSchema.pre("save", async function (next) {
    // before users are saved we will run this method ( we will store passwords here)
    const user = this; // store the current user

    if (user.isModified("password")) {
        // get current users password and hash it
        user.password = await bycrypt.hash(user.password, 8);
    }

    console.log("Just before saving");
    next(); // will save the user when completed
});


const User = mongoose.model("User", userSchema);

module.exports = User;
