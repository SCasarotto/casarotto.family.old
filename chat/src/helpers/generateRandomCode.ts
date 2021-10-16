const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

export const generateRandomCode = (length = 2) => {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += s4();
  }
  return code;
};
