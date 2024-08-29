import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { operationValidator } from "../validators/map.validator.js";
import { upload } from "../../utils/index.js";
import {
  suspectSearch,
  vehicleOperation,
  getOperations,
  liveVehicleOperation,
  liveSuspectSearch,
  liveIncidentsTracking,
} from "../controllers/operations.controller.js";

const router = express.Router();

router.post("/suspect-search", authMiddleware, suspectSearch);
router.get("/suspect-search/live", authMiddleware, liveSuspectSearch);

router.post("/vehicle", authMiddleware, vehicleOperation);
router.get("/vehicle/live", authMiddleware, liveVehicleOperation);
router.get("/", authMiddleware, getOperations);
router.get("/incidents/live", authMiddleware, liveIncidentsTracking);

// Get the status of operations route
router.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
