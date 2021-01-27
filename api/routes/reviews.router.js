const router = require('express').Router()
const { isUser, isAdmin } = require('../utils') // Authenticated Route

const {
    getAllReviews,
    createNewReview,
    getReviewById,
    deleteReviewById,
    updateReviewById
} = require('../controllers/reviews.controller.js')

router
    .get('/', isUser, getAllReviews)
    .post('/', isUser, createNewReview)
    .get('/:reviewId', isUser, getReviewById)
    .delete(':reviewId', isUser, deleteReviewById)
    .put('/:reviewId', isUser, updateReviewById)

module.exports = router