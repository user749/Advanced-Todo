import bcrypt from "bcryptjs";

//hash the password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//verify password
export const isPassMatched = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
