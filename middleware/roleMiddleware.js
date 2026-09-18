
const jwt = require('jsonwebtoken')

let adminMiddleware = (req, res, next) => {

    let authorizationToken = req.headers.authorization

    if (!authorizationToken) {
        return res.status(401).json({
            success: false,
            message: "You are not loggedin"
        })
    }

    let token = authorizationToken.split(" ")[1]

    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SCERET)

    if (decoded.role != "admin") {
        return res.status(401).json({
            success: false,
            message: "You are not authorized"
        })
    } else {
        next()
    }

    console.log(decoded)
}


///VENDOR_MIDDLEWARE

///let vendorMiddleware = (req, res, next) => {

//     let authorizationToken = req.headers.authorization

//     if (!authorizationToken) {
//         return res.status(401).json({
//             success: false,
//             message: "You are not loggedin"
//         })
//     }

//     let token = authorizationToken.split(" ")[1]

//     let decoded = jwt.verify(token, process.env.JWT_VERIFY_SCERET)

//     if (decoded.role != "vendor" && decoded.role != "admin") {
//         return res.status(401).json({
//             success: false,
//             message: "You are not authorized"
//         })
//     } else {
//         next()
//     }

//     console.log(decoded)
// }


///User_Middleware

let userMiddleware = (req, res, next) => {

    let authorizationToken = req.headers.authorization

    if (!authorizationToken) {
        return res.status(401).json({
            success: false,
            message: "You are not loggedin"
        })
    }

    let token = authorizationToken.split(" ")[1]

    let decoded = jwt.verify(token, process.env.JWT_VERIFY_SCERET)

    if (decoded.role != "user") {
        return res.status(401).json({
            success: false,
            message: "You are not authorized"
        })
    } else {
        next()
    }

    console.log(decoded)
}

module.exports = {
    adminMiddleware,
    //vendorMiddleware,
    userMiddleware
}

