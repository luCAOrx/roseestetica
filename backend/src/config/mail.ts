export default {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
  ciphers: 'SSLv3'
}
