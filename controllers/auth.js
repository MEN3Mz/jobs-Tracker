const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const crypto = require("crypto");

const sendVerificationEmail = require("../utils/sendVerificationEmail");
const allowedUniversityDomainSuffixes = ["guc.edu.eg", "giu-uni.de"];

const register = async (req, res) => {
  const { name, email, password, location } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedLocation = location?.trim();

  if (!normalizedEmail) {
    throw new BadRequestError("Please provide email");
  }

  if (!normalizedLocation) {
    throw new BadRequestError("Please provide city");
  }

  const emailDomain = normalizedEmail.split("@")[1];
  const isAllowedUniversityEmail = allowedUniversityDomainSuffixes.some(
    (domainSuffix) =>
      emailDomain === domainSuffix || emailDomain.endsWith(`.${domainSuffix}`)
  );

  if (!isAllowedUniversityEmail) {
    throw new BadRequestError(
      "Registration is limited to university emails ending with guc.edu.eg or giu-uni.de"
    );
  }

  const origin = process.env.CLIENT_URL || req.get("origin");
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email: normalizedEmail,
    password,
    location: normalizedLocation,
    verificationToken,
  });
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify Account",
  });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Verification Failed");
  }

  if (user.isVerified) {
    return res.status(StatusCodes.OK).json({ msg: "Email already verified" });
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError("Verification Failed");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
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
  if (!user.isVerified) {
    throw new UnauthenticatedError("Please verify your account");
  }
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
  verifyEmail,
};
