const checkLoggedIn = (req, res, next) => {
  if (!req.user) return res.status(401).send("login please");

  next();
};
export default checkLoggedIn;
