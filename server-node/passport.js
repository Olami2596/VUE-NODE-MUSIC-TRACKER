const passport = require('passport')
const { User } = require('./models/user')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "secret"
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        id: jwtPayload._id
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (error) {
      return done(new Error(), false)
    }
  }
  )
)

