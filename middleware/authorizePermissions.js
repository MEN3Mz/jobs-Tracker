const { UnauthenticatedError, UnauthorizedError } = require("../errors");

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    if (!req.user.role) {
      throw new UnauthorizedError("No role assigned to this user");
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not authorized to access this route");
    }

    next();
  };
};

module.exports = authorizePermissions;
