module.exports = (fn) => (req, res, next) => {
  // equals to .catch((err) => next(err));
  fn(req, res, next).catch(next);
};
