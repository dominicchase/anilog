const User = require("../models/user");

module.exports = () => {
  getUser: async (req, res) => {};

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createUser: async (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
};
