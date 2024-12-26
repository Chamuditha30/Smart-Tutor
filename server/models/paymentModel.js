const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
    },
    january: {
      type: Boolean,
    },
    february: {
      type: Boolean,
    },
    march: {
      type: Boolean,
    },
    april: {
      type: Boolean,
    },
    may: {
      type: Boolean,
    },
    june: {
      type: Boolean,
    },
    july: {
      type: Boolean,
    },
    august: {
      type: Boolean,
    },
    september: {
      type: Boolean,
    },
    october: {
      type: Boolean,
    },
    november: {
      type: Boolean,
    },
    december: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
