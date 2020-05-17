const jwt = require('jsonwebtoken')

function authentication() {
  return async (req, res, next) => {
    try {
      console.log('req.cookie', req.cookies)
      const token = req.cookies.token

      if(!token) {
        return res.status(401).json({ 
          you: 'shall not pass!' 
        })
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if(err) {
          res.status(401).json({
            message: 'Invalid token'
          })
        }

        req.token = decodedPayload

        next()
      })
    }catch(err) {
      next(err)
    }
  }
}

module.exports = authentication