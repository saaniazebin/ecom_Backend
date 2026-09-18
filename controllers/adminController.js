let User=require("../models/userSchema")
let { catagoryEmail } = require("../utils/emailsender")

          ////User_Controller///
let allUserController=async(req,res)=>{
     let users=await User.find({}).select('-password')
 
    res.status(400).json({
        success:true ,
        message:`${users.length} users found`,
        data:users
    })
}

           ///Delete_Controllers-///
              //H.W part///

let deleteUserController = async (req, res) => {

    let { id } = req.params

    let existingUser = await User.findOne({ _id: id })

    if (!existingUser) {

        return res.status(400).json({

            success: "false",

            message: "user not found"

        })

    }

    await User.findByIdAndDelete(id)

    return res.status(200).json({

        success: "true",

        message: "User deleted successfully"

    })

} 


             ////single_controller///
let singleUser = async (req, res) => {

    let { id } = req.params

    let data = await User.findOne({ _id: id }).select('-password')

    res.status(200).json({
        success: true,
        message: `User info`,
        data: data
    })
}
            ////Active_User///
let activeUser=async (req,res)=>{
    let data=await User.findOne({status:'active'})
        res.status(200).json({
        success:true,
        messsage:`Active user info`,
        data:data
    })
}   

               ////Deactive_user///
let deactiveUser=async (req,res)=>{
    let data=await User.findOne({status:'deactive'})
        res.status(200).json({
        success:true,
        messsage:`deactive user info`,
        data:data
    })
}   
    

   /////User_updated////
let updateUser = async (req, res) => {

    let { id } = req.params

    let data = await User.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    )

    res.status(200).json({
        success: true,
        message: `User updated`,
        data: data
    })
}


module.exports={allUserController ,deleteUserController,singleUser ,activeUser,deactiveUser,updateUser}
