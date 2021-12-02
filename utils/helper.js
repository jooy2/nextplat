export const getNextEnv = (key, isNumber) => {
  if (!key) {
    return process.env;
  }
  const val = process.env[`NEXT_PUBLIC_${key}`];
  return isNumber ? parseInt(val, 10) : val;
};

export default {
  getNextEnv,
};
