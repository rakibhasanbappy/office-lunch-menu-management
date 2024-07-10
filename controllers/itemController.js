// internal imports
const getClient = require("../db_operations/get_client");

// create a new item
const createItem = async (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  if (!name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for the item" });
  }
  if (!description) description = "";
  try {
    const client = await getClient();
    const newItem = await client.query(
      "INSERT INTO item (name, description) VALUES($1, $2) RETURNING *",
      [name, description]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// get all items
const getAllItems = async (req, res) => {
  try {
    const client = await getClient();
    const items = await client.query("SELECT * FROM item");
    res.json(items.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// get a single item
const getSingleItem = async (req, res) => {
  let id = req.params.id;
  try {
    const client = await getClient();
    const item = await client.query("SELECT * FROM item WHERE id = $1", [id]);
    if (item.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// update an item
const updateItem = async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  if (!name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for the item" });
  }
  if (!description) description = "";
  try {
    const client = await getClient();
    const updatedItem = await client.query(
      "UPDATE item SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    if (updatedItem.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// delete an item
const deleteItem = async (req, res) => {
  let id = req.params.id;
  try {
    const client = await getClient();
    const deletedItem = await client.query(
      "DELETE FROM item WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedItem.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(deletedItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// export the module
module.exports = {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
};
