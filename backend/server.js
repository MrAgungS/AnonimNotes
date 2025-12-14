import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import notesRoutes from "./src/routes/notesRoutes.js";
import rateLimiter from "./src/middleware/rateLimiter.js";




const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// CORS (DEV ONLY)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
}

// MIDDLEWARE
app.use(express.json());
app.use(rateLimiter);

// API ROUTES
app.use("/api/notes", notesRoutes);

// SERVE NEXT.JS (PRODUCTION)
if (process.env.NODE_ENV === "production") {
  // Path to Next.js static export
  const frontendPath = path.join(__dirname, "../frontend/.next");

  // Serve static files (_next, assets, etc)
  app.use(express.static(frontendPath));

  // Catch-all: let Next.js handle routing
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath));
  });
}

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
