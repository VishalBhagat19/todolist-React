const express = require("express");

const UserController = require("../controllers/UserController");

const router = express.Router();


// ============================================user controller+++++++++++++++++++++++++++++++++++++++++++
router.post("/register", UserController.userregister);
router.post("/login", UserController.verifylogin);
router.get("/displayuser", UserController.displayuser);


module.exports = router;
