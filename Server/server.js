const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/error");

const Flight = require("./Models/Flight");

dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((resolve) => console.log("Connected to MongoDB Successfully"))
  .catch((err) => console.log(err));

const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Adding Json parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Add middlewares
app.use(cors());

// Import Routers
const flightRoutes = require("./Routes/flightRouter");
const reservationRoutes = require("./Routes/reservationRouter");
const auth = require("./Routes/auth");
const userRoutes = require("./Routes/userRouter");

// Mount Routers to their paths
app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: parseInt(item.price) * 100,
          },
          quantity: req.body.quantity,
        };
      }),
      success_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/",
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api/flights", flightRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/auth", auth);
app.use("/api/users", userRoutes);

// Add ErrorHandler middleware here ... 'Must be added after mounting routers'
app.use(errorHandler);

// Launch server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1)); //Take down server
});
