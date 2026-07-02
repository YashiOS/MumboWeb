const mongoose = require("mongoose");

console.log("🛠 Connecting to MongoDB...");
mongoose.set("debug", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    console.error("Error details:", err.message);
    console.error("Error stack:", err.stack);
    process.exit(1);
  });
