const { signup, login } = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post("/api/login", loginValidation, login);
router.post("/api/signup", signupValidation, signup);

module.exports = router;
