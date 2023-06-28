import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const token = jwt.sign(
    { id },
    "MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHrZ+S13GwbUC6IyVCROhGgNy5Ov"
  );
  const expiresIn = "5d";

  return { token, expiresIn };
};
