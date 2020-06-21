const speakeasy = require('speakeasy')
module.exports = (req, res) => {
  const secret = speakeasy.generateSecret({ name: 'auth-factor' })
  return res.json({ image: secret.otpauth_url, secret: secret.ascii })
}
