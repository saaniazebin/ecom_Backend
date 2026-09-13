const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const { verificationEmail ,forgotpasswordEmail} = require('../utils/emailsender')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


////RegistrationController////
let registrationController = async (req, res) => {
    let { fullname, email, password, confirmPassword, terms } = req.body

    let existingUser = await User.findOne({ email: email })

    if (existingUser) {
        return res.status(400).json({
            success: "false",
            message: "email already exist"
        })
    }
    if (!fullname || !email || !password || !confirmPassword || !terms) {
        return res.status(400).json({
            success: "false",
            message: "Give the above imformation to registration"
        })
    }


    //Email_Validation ////
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: "false",
            message: "Give the valid email"
        })
    }


    //Password_Validation///
    //     if(!passwordRegex.test(password)){
    //     return res.status(400).json({
    //             success:"false",
    //             message:"Please give a password and it have to lower,higher and speacial character                     "
    //         })
    // }


    ///confirm_PASSWORD////
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: "false",
            message: "password not match"
        })
    }

    const hash = bcrypt.hashSync(password, 10);

    ///TO SAVE DATABAGE//
    const user = new User({
        Fullname: Fullname,
        email: email,
        password: hash,
        terms: terms

    })
    await user.save()


    let varificationToken = jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_VERIFY_SCERET, {
        expiresIn: '7d'
    })

    verificationEmail(email, varificationToken)



    return res.status(201).json({
        success: true,
        message: "Registration completed"
    })
}

//////LOGINCONTROLLER/////


let loginController = async (req, res) => {
    let { email, password } = req.body

    let existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(400).json({
            success: "false",
            message: " user not found /Invalid credential"
        })
    }
    if (!password || !email) {
        return res.status(400).json({
            success: "false",
            message: "Give the above imformation to registration"
        })
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: "false",
            message: "Give the valid email"
        })
    }
    let passCompare = bcrypt.compareSync(password, existingUser.password)
    if (passCompare) {
        let accessToken = jwt.sign({
            _id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role
        }, process.env.JWT_VERIFY_SCERET, {
            expiresIn: '7d'
        })

        return res.status(400).json({
            success: "true",
            message: "Login successful",
            data: {
                _id: existingUser.id,
                Fullname: existingUser.Fullname,
                email: existingUser.email,
                role: existingUser.role
            },accessToken:accessToken
        })
    } else {
        return res.status(400).json({
            success: "false",
            message: "Invalid credential"
        })
    }
}


///VARIFYCONTROLLER////

let verifyEmailController = async (res, req) => {
    let { token } = req.params
    var decoded = jwt.verify(token, process.env.JWT_VERIFY_SCERET);
    await User.findIdByUpdate({ _id: decoded._id }, { isvarified: true })
    res.status(200).json({
        success: "true",
        message: "email varified"
    })
}
   

             //FORGET_PASSWORD/

let forgotpasswordController=async(req,res)=>{
let {email}=req.body


let existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(400).json({
            success: "false",
            message: "user not found"
        })
    }

    let resetpasswordToken=jwt.sign({
        _id:existingUser._id,
        email:existingUser.email
    },process.env.JWT_VERIFY_SCERET,{
        expiresIn:'7d'
    })
    forgotpasswordEmail(email,resetpasswordToken)
    return res.status(200).json({
        success: "true",
        message: "Please check your email for reset your password"
    })
}  

            ///RESETPASSWORD
 let resetpasswordController=async(req,res)=>{
let {token}=req.params
let {newpassword,confirmPassword}=req.body
let decoded = jwt.verify(token, process.env.JWT_VERIFY_SCERET);

if (decoded){
    if (newpassword==confirmPassword){
         const hash = bcrypt.hashSync(newpassword, 10);
        await User.findByIdAndUpdate({_id:decoded._id},{password:hash})
       
    }else{
         res.status(400).json({
        success: "false",
        message: "Password not match,try again"
    })
    }
     res.status(200).json({
        success: "true",
        message: "Password Updated"
    }) 
}
           


 }


///eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWE1YzE1NzU2ZjQxMjlmMDkxYzU3OWYiLCJlbWFpbCI6InNhYW5pYXplYmluQGdtYWlsLmNvbSIsImlhdCI6MTc4OTI0ODI1MywiZXhwIjoxNzg5ODUzMDUzfQ.-H5gZdDow-KmCeWpO44HJ6nrtiEB2eNuIFzTcNGCmQA
module.exports = { registrationController, loginController, verifyEmailController ,forgotpasswordController,resetpasswordController }
