export const roleRestriction = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.userAuth.role)) {
      throw new Error("You don't have permission to access this website");
    }
    next();
  };
};
