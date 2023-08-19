import express, { Request, Response } from "express";
import path from "path";
import csrf from "csurf";

import userRoutes from "./userRoutes.ts";
import packRoutes from "./packRoutes.ts";
import itemRoutes from "./itemRoutes.ts";
import tripRoutes from "./tripRoutes.ts";
import weatherRoutes from "./weatherRoutes.ts";
import geoCodeRoutes from "./geoCodeRoutes.ts";
import getParkRoutes from "./getParkRoutes.ts";
import getTrailRoutes from "./getTrailRoutes.ts";
import osmRoutes from "./osmRoutes.ts";
import passwordResetRoutes from "./passwordResetRoutes.ts";
import openAiRoutes from "./openAiRoutes.ts";
import templateRoutes from "./templateRoutes.ts";
import favoriteRouters from "./favoriteRoutes.ts";

const router = express.Router();

// Create a CSRF middleware
const csrfProtection = csrf({ cookie: true });

const logger = (req:Request, res:Response, next:express.NextFunction) => {
  console.log(`Incoming ${req.method} ${req.path}`);
  res.on("finish", () => {
    console.log(`Finished ${req.method} ${req.path} ${res.statusCode}`);
    console.log(`Body ${req.body}`);
  });
  next();
};

// use logger middleware in development
if (process.env.NODE_ENV !== "production") {
  router.use(logger);
}

// use routes
router.use("/user", userRoutes);
router.use("/pack", packRoutes);
router.use("/item", itemRoutes);
router.use("/trip", tripRoutes);
router.use("/weather", weatherRoutes);
router.use("/geocode", geoCodeRoutes);
router.use("/getparks", getParkRoutes);
router.use("/gettrails", getTrailRoutes);
router.use("/osm", osmRoutes);
router.use("/password-reset", passwordResetRoutes);
router.use("/openai", openAiRoutes);
router.use("/template", templateRoutes);
router.use("/favorite", favoriteRouters);
router.use("/openai", openAiRoutes);

// Also listen to /api for backwards compatibility
router.use("/api/user", userRoutes);
router.use("/api/pack", packRoutes);
router.use("/api/item", itemRoutes);
router.use("/api/trip", tripRoutes);
router.use("/api/weather", weatherRoutes);
router.use("/api/geocode", geoCodeRoutes);
router.use("/api/getparks", getParkRoutes);
router.use("/api/gettrails", getTrailRoutes);
router.use("/api/osm", osmRoutes);
router.use("/api/password-reset", passwordResetRoutes);
router.use("/api/openai", openAiRoutes);
router.use("/api/template", templateRoutes);
router.use("/api/favorite", favoriteRouters);
router.use("/api/openai", openAiRoutes);

// Static routes for serving the React Native Web app
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // Serve the client's index.html file at the root route
  router.get("/", (req, res) => {
    // Attach the CSRF token cookie to the response
    // res.cookie("XSRF-TOKEN", req.csrfToken());

    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });

  // Serve the static assets from the client's dist app
  router.use(express.static(path.join(__dirname, "../client/dist")));

  // Serve the client's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    // res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

// Attach the CSRF token to a specific route in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    // res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(201).json({});
  });
}

export default router;
