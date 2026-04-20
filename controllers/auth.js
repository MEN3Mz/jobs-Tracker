const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      location: user.location,
      email: user.email,
      role: user.role,

      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      location: user.location,
      email: user.email,
      role: user.role,

      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    throw new BadRequestError("please provide all values");
  }
  const currentUser = await User.findById(req.user.userId);
  if (!currentUser) throw new NotFoundError("user not found");
  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { name, location },
    { new: true, runValidators: true },
  );
  if (!user) throw new NotFoundError("user not found");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      location: user.location,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

module.exports = {
  register,
  login,
  updateUser,
};
