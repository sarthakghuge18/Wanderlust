const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//index route
// router.get("/", wrapAsync(listingController.index));
//create route 
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
    

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show route 
// router.get("/:id", wrapAsync(listingController.showListing));
//update route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));
//delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//edit route 
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
