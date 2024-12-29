
const{
    addMsg,
    getAllMsg,
    deleteMsgById,
    getAllMessages
} = require("../controllers/messagesController")
const router = require("express").Router();
router.get("/",getAllMessages);
router.post("/addmessage",addMsg);
router.post("/getmsgs", getAllMsg);
router.delete("/messages/:id", deleteMsgById);

module.exports = router;
