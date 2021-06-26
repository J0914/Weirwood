const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const db = require('../../db/models');

const router = express.Router();

    reviewValidators = [
        check('body')
        .exists({ checkFalsey: true })
        .withMessage('Sorry, you can\'t post an empty review.')
    ]

    router.put(`/:reviewId`, reviewValidators, asyncHandler(async(req,res,next) => {
        const { userId, spotId, reviewId, body } = req.body;
    
        const review = await db.Review.findByPk(reviewId);
        
        if (!review) {
            const err = new Error('Review not found');
            err.status = 404;
            err.title = 'Review not found';
            err.errors = ['Could not find review. Please try again!'];
            return next(err);
        } else {
            await review.update({userId, spotId, body})
        }
    
        const reviews = await db.Review.findAll({
        where: {
            spotId 
        },
        include: db.User,
        order: [['id', 'DESC']], 
    })
    
        if (!reviews) {
        const err = new Error('Reviews not found');
        err.status = 404;
        err.title = 'Reviews not found';
        err.errors = ['Could not find reviews. Please try again!'];
        return next(err);
        }
    
        return res.json({ reviews })
    }))

    router.delete('/:reviewId', asyncHandler(async(req,res,next) => {
        const { spotId, reviewId } = req.body;
        const review = await db.Review.findByPk(reviewId);
        console.log('********************************', review)
        await review.destroy()

        const reviews = await db.Review.findAll({
            where: {
                spotId 
            },
            include: db.User,
            order: [['id', 'DESC']], 
        })
        
        if (!reviews) {
        const err = new Error('Reviews not found');
        err.status = 404;
        err.title = 'Reviews not found';
        err.errors = ['Could not find reviews. Please try again!'];
        return next(err);
        }
    
        return res.json({ reviews })
    }))


  module.exports = router;