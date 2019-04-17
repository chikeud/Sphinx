/**
 * @author Chike Udenze
 * @since 11/23/2017
 *
 */

let express = require("express");
let auth = require("../../../utils/authToken");
let booking = require("./booking");
let dates = require("./dates");
let bookingRouter = express.Router();

bookingRouter.post("/new",auth.checkToken,booking.createBooking);
bookingRouter.get("/all", auth.checkToken, booking.getAllBookings);
bookingRouter.get("/dates", dates.getDates);

module.exports = bookingRouter;