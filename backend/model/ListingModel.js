const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  myFile: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
