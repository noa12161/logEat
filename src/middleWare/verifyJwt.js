import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return next();

  jwt.verify(token, process.env.JWT_SEC, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized", ok: false });
    } else {
      req.user = {
        _id: decodedToken._id,
        username: decodedToken.username,
        role: decodedToken.role,
      };
      next();
    }
  });
};

export default verifyJwt;
