const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports.sendMail = async function sendMail(mailOptions) {
  const settings = fs.readFileSync(process.cwd() + '/utils/settings.json');
  const data = JSON.parse(settings);
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: data.email,
      pass: data.password
    }
  });
  return await smtpTransport.sendMail(mailOptions);
};