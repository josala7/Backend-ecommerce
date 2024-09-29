const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "*", // control the accepted domains to access our endpoint
};

// MIDDLEWARES
const logMiddleware = require("./middlewares/log-middleware");

const apiRoutes = require("./routes/api-route");

// CONFIGS
const connectDB = require("./configs/database");
const app = express();
// const PORT = +process.env.PORT || 3000;
const PORT = 3000;
connectDB();
// BUILT-IN MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // json parser

// BUILT-IN MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // json parser

// APPLICATION LEVEL MIDDLEWARE
app.use(logMiddleware);

app.use("/api", apiRoutes); // v1 | v2

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
