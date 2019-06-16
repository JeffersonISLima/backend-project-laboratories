const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const examSchema = new Schema({
  name: String,
  type: String,
  status: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;