const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
require("dotenv").config();
const Listing = require("./model/ListingModel");
require("./init/db");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/auth", AuthRouter);

// New listing route
app.post("/api/listing/new", async (req, res) => {
  try {
    let body = req.body;
    let newListing = await Listing.create(body);
    newListing.save();
    res.status(201).json({ msg: "Form uploaded" });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

// Get all listings
app.get("/api/listing", async (req, res) => {
  try {
    const allListing = await Listing.find({});
    res.json(allListing);
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
});

// listing by ID
app.get("/api/listing/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await Listing.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update Route
app.put("/api/listing/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await Listing.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }

    const updateUser = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete Route
app.delete("/api/listing/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await Listing.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }

    const deleteUser = await Listing.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/ping", async (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
