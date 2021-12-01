const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'ezflightsguc@gmail.com',
      pass: 'Ezflight1234',
    },
  });
  

  // send mail with defined transport object
  const message = {
    from: '"EZ Flights" <noreply@ez-flights.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
  };

  const info = await transporter.sendMail(message);

};

module.exports = sendEmail;
