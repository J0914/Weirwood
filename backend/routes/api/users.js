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
    },
    include: db.Spot
  })
  return res.json({ bookings })

}))

router.put('/:userId/bookings/:bookingId', asyncHandler(async (req,res) => {
  const { bookingId, spotId, userId, start, end } = req.body;

  const booking = await db.Booking.findByPk(bookingId);
        
  if (!booking) {
      const err = new Error('Booking not found');
      err.status = 404;
      err.title = 'Booking not found';
      err.errors = ['Could not find booking. Please try again!'];
      return next(err);
  } else {
      await booking.update({userId, spotId, start, end});
  }

  const userBookings = await db.Booking.findAll({
    where: {
        userId 
    },
    include: db.Spot,
    order: [['updatedAt', 'DESC']], 
})

    if (!userBookings) {
    const err = new Error('Bookings not found');
    err.status = 404;
    err.title = 'Bookings not found';
    err.errors = ['Could not find bookings. Please try again!'];
    return next(err);
    }

    return res.json({ userBookings })

}))

router.delete('/:userId/bookings/:bookingId', asyncHandler(async(req,res,next) => {
  const { userId, bookingId } = req.body;
  const booking = await db.Booking.findByPk(bookingId);
  await booking.destroy()

  const userBookings = await db.Booking.findAll({
      where: {
          userId 
      },
      include: db.Spot,
      order: [['updatedAt', 'DESC']], 
  })
  
  if (!userBookings) {
  const err = new Error('bookings not found');
  err.status = 404;
  err.title = 'bookings not found';
  err.errors = ['Could not find any bookings for this user!'];
  return next(err);
  }

  return res.json({ userBookings })
}))

module.exports = router;