
const User = require("../model/userModel");
const Message = require("../model/messageModel");
const brcypt  =require("bcrypt");

module.exports.register = async(req,res,next) =>{

    try{
    const {username,email,password} = req.body;
    const usernameCheck= await User.findOne({username});

    if(usernameCheck)
        return res.json({msg:"Username already used",status : false})

    const emailCheck = await User.findOne({email})

    if(emailCheck)
        return res.json({msg:"email already used",status : false})

    const hashedPassword = await brcypt.hash(password,10)

     const user = await User.create({

        email,
        username,
        password:hashedPassword,

     })   ; 

    delete user.password;
    return res.json({status:true,user})
    }catch(err){
        next(err)
    }
    
};

module.exports.login = async(req,res,next) =>{

    try{
    const {password,username} = req.body;
    const user = await User.findOne({username});
        console.log(user);2
    if(!user)
        return res.json({msg:"Incorrect username or password",status : false})

   const isPasswordValid = await brcypt.compare(password,user.password);
    console.log(isPasswordValid);
   if(!isPasswordValid){
     return res.json({msg:"Incorrect username or password",status : false})
   }

   delete user.password;
   console.log(user);
        return res.json({status:true,user})

    }catch(err){
        next(err)
    }
    
};

module.exports.setAvatar = async(req,res,next) =>{

    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        });
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
    }catch(err){
        next(err)
    }
};

module.exports.getAllUsers = async(req,res,next) =>{

    try{

        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ])
      return res.json(users);  
    }catch(err){
        next(err);
    }

};



module.exports.modify = async(req,res,next) =>{

    try{
        const userId = req.params.id;
        const userName = req.body.username;
        const userPassWord = req.body.password;
        const userEmail = req.body.email;
        const mod_user = await User.findById(userId);
        const userCheck= await User.findOne({userName});

        
        
       
            
            const testPassword = await brcypt.compare(userPassWord,mod_user.password);
            console.log(testPassword);
            if(!testPassword){
                const hashedPassword = await brcypt.hash(userPassWord,10);
                const userData = await User.findByIdAndUpdate(userId,{
                    username:userName,
                    email:userEmail,
                    password:hashedPassword,
                });
                return res.json({username:userData.username,email:userData.email,password:userData.password,isSet:true})    
            }else{
                const userData = await User.findByIdAndUpdate(userId,{
                    username:userName,
                    email:userEmail,
                });
                return res.json({username:userData.username,email:userData.email,isSet:true,password:userData.password})
            }
    }catch(err){
        next(err);
    }

}

module.exports.deleteUser =  async(req,res,next) =>{
    try{
    var id = req.params.id
    const user  = await User.findById(id);
    if(user){
        await User.deleteOne({_id:user._id})
        await Message.deleteMany({ sender: { $gte: user._id } })
       

        return res.json(200,{msg:"count deleted successfully"});
    }else
        return res.json(405,{msg:"oups no ressources found"});
}catch(err){
    next(err)
}

}






