const express = require("express");
const { pool } = require("../config/database");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const dbResult = await pool.query("SELECT NOW()");
    res.status(200).json({
      status: "healthy",
      service: "ecs-fargate-backend",
      database: "connected",
      timestamp: dbResult.rows[0].now,
    });
  } catch (err) {
    res.status(503).json({
      status: "unhealthy",
      service: "ecs-fargate-backend",
      database: "disconnected",
      error: err.message,
    });
  }
});

module.exports = router;
