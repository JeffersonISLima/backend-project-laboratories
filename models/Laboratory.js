const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const laboratorySchema = new Schema({
  name: String,
  address: String,
  status: String,
  exams:  Array,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Laboratory = mongoose.model("Laboratory", laboratorySchema);

module.exports = Laboratory;