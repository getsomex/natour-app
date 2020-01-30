const Review = require('../models/reviewModel');
// const appError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require('./handlerFactory');

const setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getReviews = getAll(Review);
const getReview = getOne(Review);
const createReview = createOne(Review);
const deleteReview = deleteOne(Review);
const updateReview = updateOne(Review);
module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview
};
