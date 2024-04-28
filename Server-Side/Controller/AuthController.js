const AuthModel = require("../Models/AuthModel");

const UserRegister = async (req, resp) => {
  try {
    const { name, email, phone, password } = req.body;

    const UserExists = await AuthModel.findOne({ email });

    if (UserExists) {
      return resp.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await AuthModel.create({ name, email, phone, password });

    resp.status(201).send({
      message: "Register Successful",
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const Loginuser = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const checkUser = await AuthModel.findOne({ email });

    if (!checkUser) {
      return resp.status(400).json({ message: "Invalid User" });
    } else {
      const user = await checkUser.ComparePassword(password);

      if (user) {
        resp.status(201).send({
          msg: "Login Successful",
          token: await checkUser.generateToken(),
          userId: checkUser._id.toString(),
        });
      } else {
        return resp.status(401).json({ messgae: "Check Email and Password" });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const userData = async (req, resp) => {
  try {
    const usersData = req.user;
    resp.status(200).json({usersData});
  } catch (error) {
    console.log(`Error from the user root ${error}`);
  }
};

module.exports = { UserRegister, Loginuser, userData };
