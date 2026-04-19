const express = require("express");
const router = express.Router();

const {
  getAllAIEF,
  getAiefFilters,
  getAIEF,
  updateAIEF,
  deleteAIEF,
  createAIEF,
} = require("../controllers/AIEF");

const authenticateUser = require("../middleware/authentication");
const authorizePermissions = require("../middleware/authorizePermissions");
const testUser = require("../middleware/testUser");

router
  .route("/")
  .get(getAllAIEF)
  .post(authenticateUser, authorizePermissions("admin"), testUser, createAIEF);

router.route("/filters").get(getAiefFilters);

router
  .route("/:id")
  .get(getAIEF)
  .patch(authenticateUser, authorizePermissions("admin"), testUser, updateAIEF)
  .delete(
    authenticateUser,
    authorizePermissions("admin"),
    testUser,
    deleteAIEF,
  );

module.exports = router;
