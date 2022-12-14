const router = require("express").Router();
const User = require("../../models/User");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.username;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Need to set up POST route for creating a user
router.post("/createUser", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (userData) {
      res
        .status(400)
        .json({ message: "Error: User already exists! Please log in." });
      return;
    }

    await User.create(req.body, {
      individualHooks: true,
      returning: true,
    });
  } catch (err) {
    res.status(401).json(err);
  }

  const newUser = await User.findOne({ where: { email: req.body.email } });

  req.session.save(() => {
    req.session.logged_in = true;
    req.session.user_id = newUser.id;
    req.session.user_name = newUser.username;

    res
      .status(200)
      .json({ message: "Account created successfully! Logging in User." });
  });
});
module.exports = router;
