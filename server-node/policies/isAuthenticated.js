const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    console.log(user)
    console.log(req.user)
    // console.log("User Token:", jwtPayload);
    if (err || !user) {
      res.status(403).send({
        error: 'you do not have access to this resource'
      })
      console.log(req.user);
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
} 

