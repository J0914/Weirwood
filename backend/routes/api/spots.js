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
  console.log(id)
    const spot = await db.Spot.findOne({
        where: { id },
        include: {
            model: db.Image,
            where: { spotId: id }
        }
    })
    console.log('*********************', spot)
    return res.json({ spot })
})) 

module.exports = router;