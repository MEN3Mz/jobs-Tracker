const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const port = Number(process.env.SMTP_PORT);
module.exports = {
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
};
