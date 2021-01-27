const reviewModel = require('../models/reviews.model')
const usersModel = require('../models/users.model');

function getAllReviews(req, res) {
    reviewModel
        .find()
        .then(allReviews => {
            res.status(200).json(allReviews);
        })
        .catch(err => {
            res.status(500).send('Reviews not found')
        })
}

function createNewReview(req, res) {
    reviewModel
        .create({
            user:res.locals.user._id,
            date_create:Date.now().toString(),
            comment:req.body.comment,
            public:false,
            puntuation:req.body.puntuation
        })
        .then(newReview => {
            usersModel
                .findById(res.locals.user._id)
                .then(user => {
                    user.array_cars.push(newReview)
                    user.save(function (err){
                        if(err) return res.status(500).send(err);
                        res.status(200).json(newReview);
                    })
                })
                .catch(err => {
                    res.status(500).send('Review can not be added');
                })
        })
        .catch(err => {
            res.status(500).send('Review can not be created');
        })
}

function getReviewById(req, res) {
    reviewModel
        .findOne({_id:req.params.reviewId})
        .then(review => {
            res.status(200).json(review);
        })
        .catch(err => {
            res.status(500).send('Review not found');
        })
}

function deleteReviewById(req, res) {
    reviewModel
        .deleteOne({_id:req.params.reviewId})
        .then(reviewDeleted => {
            usersModel
                .findOne({_id:reviewDeleted.user})
                .then(user => {
                    var i = user.array_reviews.indexOf(reviewDeleted._id);
                    user.array_reviews.splice(i,1);
                    user.save(function (err) {
                        if(err) return res.status(500).send(err);
                        res.status(200).json(reviewDeleted);
                    })
                    .catch(err => {
                        res.status(500).send('Review can not be deleted');
                    })
                })
        })
        .catch(err => {
            res.status(500).send('Review can not be deleted');
        })
}

function updateReviewById(req, res) {
    reviewModel
        .findOneAndUpdate({_id:req.params.reviewId}, {
            date_create:Date.now().toString(),
            comment:req.body.comment,
            public:false,
            puntuation:req.body.puntuation
        })
        .then(reviewUpdated => {
            res.status(200).json(reviewUpdated);
        })
        .catch(err => {
            res.status(500).send('Review can not be updated');
        })

}

module.exports = {
    getAllReviews,
    createNewReview,
    getReviewById,
    deleteReviewById,
    updateReviewById
}