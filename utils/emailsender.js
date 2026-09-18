const nodemailer = require("nodemailer");  
/ ///Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});
async function verificationEmail(email, token){
    try {
  const info = await transporter.sendMail({
    from: 'saaniazebin@gmail.com', 
    to: email, // list of recipients
    subject: "Hello", // subject line
    text: "Hello world?", // plain text body
    html: `<b>verify your email <a href ="http://localhost:5173/verify/${token}">Click here</a></b>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

///FORGOTPASSWORDEMAIL///
async function forgotpasswordEmail(email, token){
    try {
  const info = await transporter.sendMail({
    from: 'saaniazebin@gmail.com', 
    to: email, // list of recipients
    subject: "Reset your password", // subject line
   
    html: `<b>Reseting your password <a href ="http://localhost:5173/resetpassword/${token}">Click Here</a></b>`, // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}
/////CATAGORYEMAIL////
async function catagoryEmail(name) {
    try {
        const info = await transporter.sendMail({
            from: 'saaniazebin@gmail.com',
            to: 'saaniazebin@gmail.com',
            subject: "New Catagory Created",
            html: `<b>New catagory created: ${name}</b>`,
        })

        console.log("Message sent: %s", info.messageId)

    } catch (err) {
        console.error("Error while sending mail:", err)
    }
}
module.exports={verificationEmail,forgotpasswordEmail,catagoryEmail}