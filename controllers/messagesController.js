const messageModel = require("../model/messageModel");

module.exports.addMsg = async(req,res,next) => {

    try{

        const {from,to,message} = req.body;
        const data = await messageModel.create({
            message:{
                text : message
            },
            users:[from ,to],
            sender:from,
        });
        if(data)
            return res.json({msg:"Message added successfully ."})
        return res.json({msg:"Failed to save message in database."})

    }catch(err){
        next(err);
    }

}

module.exports.getAllMsg = async(req,res,next) => {
    
    try{

        const {from,to} = req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from ,to],
            }    
        }).sort({updatedAt :1});
        const projectedMassages = messages.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message:msg.message.text,
            };
        });

        res.json(projectedMassages);

    }catch(err){
        next(err)
    }

}


module.exports.deleteMsgById = async(req,res,next) => {

    var id = req.params.id;
    const message  = await Message.findById(id);
    if(message){
        await Message.deleteOne({_id:message._id})
        return res.json(200,{msg:"succefully deleted",status:true});
    }else
        return res.json(405,{msg:"oups no ressources found"});
    

}

