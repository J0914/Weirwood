const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

const router = express.Router();

const validateSpot = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('You must include a title!'),
    check('location')
      .exists({ checkFalsy: true })
      .withMessage('You must include a location!'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('You must include a description!'),
    handleValidationErrors,
];

const validateImage = [
    check('url')
      .exists({ checkFalsy: true })
      .withMessage('You must include a url for your image!')
]

router.get('/', asyncHandler(async (req,res) => {
    const spots = await db.Spot.findAll({
      include: db.Image
    });
    return res.json({ spots })
}))

router.get('/:id', asyncHandler(async (req,res) => {
  const id = parseInt(req.params.id, 10)
    const spot = await db.Spot.findOne({
        where: { id },
        include: {
            model: db.Image,
            where: { spotId: id }
        }
    })
    return res.json({ spot })
})) 

const validateBooking = [
  check('start')
    .exists({checkFalsy: true})
    .withMessage('Please choose a start date!'),
  check('end')
    .exists({checkFalsy: true})
    .withMessage('Please choose a end date!')
]

router.post('/:spotId/book', validateBooking, asyncHandler(async (req, res) => {
  const spotId = parseInt(req.params.spotId, 10)
  const { userId, start, end } = req.body;

  const alreadyExists = await db.Booking.findAll({
    where: {
      spotId: spotId, 
      userId: userId
    }
  })
  if (alreadyExists.length > 0) {
    let errors = 'You have already created a booking for this castle!'
    res.json({errors})
    return;
  }

  const booking = await db.Booking.create({
    userId,
    spotId,
    start,
    end
  })

  if (!booking) {
      const err = new Error('Booking failed');
      err.status = 401;
      err.title = 'Booking failed';
      err.errors = ['Seven Hells! Something went wrong. Please try again!'];
      return next(err);
  }

  const bookings = await db.Booking.findAll({
    where: {
      userId
    }
  })

  return res.json({ bookings })

}))

module.exports = router;