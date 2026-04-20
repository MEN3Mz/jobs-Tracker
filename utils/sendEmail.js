const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");
const sentFrom = process.env.EMAIL_FROM;

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  return transporter.sendMail({
    from: sentFrom,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
