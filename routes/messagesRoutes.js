
const{
    addMsg,
    getAllMsg,
    deleteMsgById,
} = require("../controllers/messagesController")
const router = require("express").Router();
router.post("/addmessage",addMsg);
router.post("/getmsgs", getAllMsg);
router.delete("/messages/:id", deleteMsgById);

module.exports = router;
