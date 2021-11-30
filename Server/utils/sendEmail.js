const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // send mail with defined transport object
  const message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
  };

  const info = await transporter.sendMail(message);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendEmail;
