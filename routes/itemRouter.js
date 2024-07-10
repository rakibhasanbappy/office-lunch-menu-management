// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// routes

// create a new item
router.post("/create", createItem);

// get all items
router.get("/", getAllItems);

// get a single item
router.get("/:id", getSingleItem);

// update an item
router.put("/:id", updateItem);

// delete an item
router.delete("/:id", deleteItem);

// export the router
module.exports = router;
