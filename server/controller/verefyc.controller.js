const speakeasy = require('speakeasy')
// n<VHOe*wx3&4c$4uC23o%f*]^}(NXXt<
module.exports = (req, res) => {
  const { code, secret } = req.body
  const verefy = speakeasy.totp.verify({
    secret,
    encoding: 'ascii',
    token: code
  })
  if (verefy === true) {
    return res.json({ status: 'success', message: 'code true' })
  } else {
    return res.json({ status: 'error', message: 'code false' })
  }
}
