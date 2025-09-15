const express = require("express");
const router = express.Router();
const { addPlacement, getPlacements, editPlacement, deletePlacement } = require("../controllers/placementController");

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
// Do NOT use () here, pass function reference only
router.post("/", isAuthenticated,isAdmin, addPlacement);
router.get("/", getPlacements);
// Edit placement (admin only)
router.put("/:id", isAuthenticated, isAdmin, editPlacement);

// Delete placement (admin only)
router.delete("/:id", isAuthenticated, isAdmin, deletePlacement);

module.exports = router;
