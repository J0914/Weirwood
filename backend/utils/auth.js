// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// This first function is setting the JWT cookie after a user
//  is logged in or signed up. It takes in the response and 
//  the session user and generates a JWT using the imported 
//  secret. It is set to expire in however many seconds you 
//  set on the JWT_EXPIRES_IN key in the .env file. The payload 
//  of the JWT will be the return of the instance method 
//  .toSafeObject that you added previously to the User model. 
//  After the JWT is created, it's set to an HTTP-only cookie 
//  on the response as a token cookie.

const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
      { data: user.toSafeObject() },
      secret,
      { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
    );
  
    const isProduction = process.env.NODE_ENV === "production";
  
    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax",
    });
  
    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
        return next();
        }

        try {
        const { id } = jwtPayload.data;
        req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
        res.clearCookie('token');
        return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

const requireAuth = [
    restoreUser,
    function (req, res, next) {
      if (req.user) return next();
  
      const err = new Error('Unauthorized');
      err.title = 'Unauthorized';
      err.errors = ['Unauthorized'];
      err.status = 401;
      return next(err);
    },
];

module.exports = { setTokenCookie, restoreUser, requireAuth };