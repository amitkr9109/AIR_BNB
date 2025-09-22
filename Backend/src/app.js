const express = require("express");
const cors = require("cors");
const app = express();
const UserRoutes = require("./routes/userRoutes/user.routes.js");
const PropertyRoutes = require("./routes/propertRoutes/property.routes.js");
const BookingRoutes = require("./routes/bookingRoutes/booking.routes.js");
const PaymentRoutes = require("./routes/paymentRoutes/payment.routes.js");
const AdminRoutes = require("./routes/adminRoutes/admin.routes.js");
const ReviewRoutes = require("./routes/reviewRoutes/review.routes.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ErrorHandler = require("./middlewares/errorHandler.js");


app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

app.get("/", function(req, res){
    res.send("hello server");
});

app.use("/user", UserRoutes);
app.use("/property", PropertyRoutes);
app.use("/booking",BookingRoutes);
app.use("/payment", PaymentRoutes);
app.use("/admin", AdminRoutes);
app.use("/review", ReviewRoutes);

app.use(ErrorHandler);

module.exports = app;