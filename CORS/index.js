// CORS = Cross-Origin Resource Sharing.
// It is a browser security mechanism that controls whether a frontend running on one origin is allowed to call an API running on another origin.
// origin = protocol + domain + port
// suppose i have api https://api.myapp.com and frontend in https://myapp.com Your backend can tell the browser: I allow requests from https://myapp.com.
// in cors we allow which access api or which not

// const express = require("express");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const cors = require("cors");

// const app = express();

// app.use(helmet());

// app.use(cors({
//     origin: "http://localhost:5173"
// }));

// app.use(express.json());

// const apiLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100
// });

// app.use("/api", apiLimiter);