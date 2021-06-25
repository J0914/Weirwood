const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Enter a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Your username must be at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('confirmedPassword')
      .exists({ checkFalsey: true })
      .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Your bloody passwords don\'t match!');
            }
            return true;
      }),
    handleValidationErrors,
  ];

// ******* Sign Up *******
router.post('/', validateSignup, asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await db.User.signup({ email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }),
);

router.get('/:userId/bookings', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const bookings = await db.Booking.findAll({
    where: {
      userId
    }
  })
  return res.json({ bookings })

}))

// f4CJ7QBO-roeokTQAahPTznjiB-D19lBnj0Q
module.exports = router;