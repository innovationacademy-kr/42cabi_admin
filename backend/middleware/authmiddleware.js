const authMiddleware = (req, res, next) => {
	const { id, password } = req.body;
	

  if () {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  authMiddleware,
};
