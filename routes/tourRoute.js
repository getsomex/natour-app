const express = require('express');

const router = express.Router();

const { protect, restrictTo } = require('../controllers/authController');
const {
  getAlltours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  alaisTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages
} = require('../controllers/tourController');
const reviewRouter = require('./reviewRoute');
// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createReview);
// router.param('id');
router.use('/:tourId/reviews', reviewRouter);
router.route('/top-5-cheap').get(alaisTopTours, getAlltours);
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(getDistances);
router
  .route('/')
  .get(getAlltours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);
router.route('/tour-stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
