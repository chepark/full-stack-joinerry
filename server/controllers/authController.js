export const logoutUser = async (req, res) => {
  req.logout((error) => {
    if (error) next(error);
  });

  if (req.user === null) {
    return res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ message: "error" });
  }
};
