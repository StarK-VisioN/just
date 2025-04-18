const express = require("express");
const router = express.Router({mergeParams: true});     // Creates new Router object
const wrapAsync = require("../utils/wrapAsync.js");                      // requiring error class in server
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js"); 

const reviewController = require("../controllers/reviews.js");


// Reviews route
// Post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Review Route 
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;