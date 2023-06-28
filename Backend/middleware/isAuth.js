import { verifyToken } from "../utils/verifyToken.js";

export const isAuthenitcated = (model) => {
  return async (req, res, next) => {
    //get token from header
    const headerObj = req.headers;
    //? optional chaining
    const token = headerObj?.authorization?.split(" ")[1];
    //verify token
    const verifiedToken = verifyToken(token);

    if (verifiedToken) {
      //find the admin
      const user = await model
        .findById(verifiedToken.id)
        .select("name email role");
      //save the user into req.obj
      req.userAuth = user;
      next();
    } else {
      const err = new Error("Token expired/invalid");
      next(err);
    }
  };
};
