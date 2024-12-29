
const{register,login,setAvatar,getAllUsers,modify,deleteUser} = require("../controllers/usersController")
const router = require("express").Router();
router.post("/register",register);
router.post("/login", login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);
router.put("/modifier/:id",modify);
router.delete("/users/:id",deleteUser)
module.exports = router;
