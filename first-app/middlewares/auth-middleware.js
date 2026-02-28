export const authMiddleware = (req, res, next) => {
  const authToken = req.header("Authorization");

  if (!authToken) {
    res.status(401).send({ error: "Please login to access this resource." });
  }

  if (authToken !== "1234") {
    res.status(403).send({ error: "You are not authorised to access this recource." });
  }

  next();
};
