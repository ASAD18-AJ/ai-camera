import express from "express";

import authRoutes from "./auth.routes.js";
import mapRoutes from "./map.routes.js";
import operationsRoutes from "./operations.route.js";
import prisma from "../../config/prismaClient.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/map", mapRoutes);
router.use("/operations", operationsRoutes);

// router.post("/insert-data", async (req, res) => {
//   try {
//     const classes = await prisma.class.findMany();

//     for (const cls of classes) {
//       let objectType;

//       // Determine the objectType based on className
//       if (
//         [
//           "apache",
//           "auto",
//           "bike-rider",
//           "bolero",
//           "bullet",
//           "bus",
//           "car",
//           "jcb",
//           "omni",
//           "pickup",
//           "pulsar",
//           "scooty",
//           "scorpio",
//           "sedan",
//           "suv",
//           "swift",
//           "thar",
//           "tractor",
//           "truck",
//           "van",
//         ].includes(cls.className)
//       ) {
//         objectType = "vehicle";
//       } else if (["child", "man", "person", "woman"].includes(cls.className)) {
//         objectType = "human";
//       } else if (
//         ["bike-rider", "motorbike-rider", "scooty-rider"].includes(
//           cls.className,
//         )
//       ) {
//         objectType = "human_with_vehicle";
//       } else if (["helmet", "no-helmet"].includes(cls.className)) {
//         objectType = "accessory";
//       } else if (cls.className === "license-plate") {
//         objectType = "object";
//       } else {
//         objectType = "miscellaneous";
//       }

//       // Update the record with the determined objectType
//       await prisma.class.update({
//         where: { id: cls.id },
//         data: { objectType },
//       });
//     }

//     res.status(200).json({
//       message: "Classes updated successfully",
//     });
//   } catch (error) {
//     console.error("Error inserting classes:", error);
//     res.status(500).json({ message: "Error inserting classes.", error });
//   }
// });

router.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

router.all("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default router;