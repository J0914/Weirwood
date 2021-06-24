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

router.get('/top', asyncHandler(async (req, res) => {
  const spots = await db.Spot.findAll({
    include: db.Image
  });

  const topSpots = [];

    spots.forEach(spot => {
    if (spot.id === 3 || spot.id === 4 || spot.id === 6 
    || spot.id === 11 || spot.id === 14) {
      topSpots.push(spot)
    }
  })

  return res.json({ topSpots })

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

router.post('/:spotId/book', validateBooking, asyncHandler(async (req, res, next) => {
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

}));

reviewValidators = [
  check('body')
    .exists({ checkFalsey: true })
    .withMessage('Sorry, you can\'t post an empty review.')
]

router.post('/:spotId/reviews', reviewValidators, asyncHandler(async (req, res, next) => {
  const spotId = parseInt(req.params.spotId, 10)
  const { userId, body } = req.body;
  console.log('USER ID IS ********', userId)
  console.log('BODY IS ********', body)

  const alreadyExists = await db.Review.findAll({
    where: {
      spotId: spotId, 
      userId: userId
    }
  })

  if (alreadyExists) {
    const err = new Error('Already Exists');
      err.status = 403;
      err.title = 'Already Exists';
      err.errors = ['Seven Hells! You\'ve already posted a review on this castle.'];
      return next(err);
  }

  const review = await db.Review.create({
    userId,
    spotId,
    body
  })

  if (!review) {
      const err = new Error('Review failed');
      err.status = 401;
      err.title = 'Booking failed';
      err.errors = ['Seven Hells! Something went wrong. Please try again!'];
      return next(err);
  }

  const reviews = await db.Review.findAll({
    where: {
      spotId
    }
  })

  return res.json({ reviews })

}));

module.exports = router;