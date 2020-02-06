const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Bookings = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template

  // 3) Render the template using tour data
  res.status(200).render('overview', {
    title: 'Overview',
    tours
  });
});

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  if (!tour) {
    return next(new AppError('There is no tour with this name', 400));
  }
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour
  });
});

const login = (req, res) => {
  res.status(200).render('login', {
    title: 'login'
  });
};
const getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};
const getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings

  const bookings = await Bookings.find({ user: req.user.id });

  // 2) find tours with returnedIDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

const updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
module.exports = {
  getOverview,
  getTour,
  login,
  getAccount,
  updateUserData,
  getMyTours
};
