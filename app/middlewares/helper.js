
exports.codeGenerator = async (prefix, model, filter = {}) => {
  let modelCount = (await model.count(filter)) + 1;
  let result = `${prefix}-${modelCount}`;
  return result;
};
