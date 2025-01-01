const mongoose = require("mongoose");
const validator = require("validator");

// Define the schema for the BMW restriction message
const bmwRestrictionMessage = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value.replace(/\s/g, "")); // Check if the name contains only letters
      },
      message: "Recipient name must contain only letters.",
    },
  },
  userInput: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isAlpha(value.replace(/\s/g, "")); // Check if the name contains only letters
      },
      message: "Sender name must contain only letters.",
    },
  },
  apologyMessage: {
    type: String,
    required: true,
    trim: true,
  },
  reason: {
    type: String,
    required: false,
    trim: true,
  },
  alternativeSuggestion: {
    type: String,
    required: true,
    trim: true,
  },
  closingStatement: {
    type: String,
    required: true,
    trim: true,
  },
  dateSent: {
    type: Date,
    default: Date.now, // Automatically set to current date
  },
});

// Create the model from the schema
const BmwRestrictionMessage = mongoose.model(
  "bmwRestrictionMessage",
  bmwRestrictionMessage
);

module.exports = BmwRestrictionMessage;
