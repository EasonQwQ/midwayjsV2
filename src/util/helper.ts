export const formatReturnSuccess = (data = null) => {
  return { code: 1, data: data };
};
export const formatReturnFail = msg => {
  return { code: 0, msg: msg };
};
