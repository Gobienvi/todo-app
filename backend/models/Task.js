const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    completed: Boolean,
    priority: Number,
  },
  { timestamps: true }
);

// Indexes (for assessment)
taskSchema.index({ priority: -1 });
taskSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
