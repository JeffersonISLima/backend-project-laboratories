const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const associationSchema = new Schema({
  bond: Array,
  id_laboratory: { type: Schema.Types.ObjectId, ref: 'Laboratory' },
  id_exam: { type: Schema.Types.ObjectId, ref: 'Exam' }, 
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Association = mongoose.model("Association", associationSchema);

module.exports = Association;