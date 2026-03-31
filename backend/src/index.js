const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const healthRouter = require("./routes/health");
const apiRouter = require("./routes/api");
const { connectDB } = require("./config/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/health", healthRouter);
app.use("/api/v1", apiRouter);

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
