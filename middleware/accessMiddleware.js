const commonAccess = (req, res, next) => {
  if (res.locals.userId === req.session.userId) {
    return next();
  }
  res.redirect('/user/signin');
};
const certainIdAccess = (req, res, next) => {
  if (req.params.userId === req.session.userId) {
    return next();
  }
  res.redirect('/user/signin');
};
module.exports = { commonAccess, certainIdAccess };
