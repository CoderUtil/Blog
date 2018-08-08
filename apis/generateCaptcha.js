const captchapng = require('captchapng')

module.exports = {
  generateCaptcha: (session) => {
    let code = '0123456789'
    let length = 4
    let randomcode = ''
    for (let i = 0; i < length; i++) 
      randomcode += code[parseInt(Math.random() * 1000) % code.length]

    session.captcha = randomcode

    let p = new captchapng(100, 30, randomcode)
    p.color(0, 0, 0, 0)
    p.color(80, 80, 80, 255)
    let img = p.getBase64()
    let imgbase64 = new Buffer(img, 'base64')
    return imgbase64
  }
}