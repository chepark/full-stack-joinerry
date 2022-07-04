export const isUserAuthenticated = (req, res, next) => {
  //! ?where is the "req.user" coming from?
  if (req.user) next();
  else {
    res.status(401).send("You must login.");
  }
};
