import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  return jwt.verify(
    token,
    "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHrZ+S13GwbUC6IyVCROhGgNy5Ov",
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );
};
