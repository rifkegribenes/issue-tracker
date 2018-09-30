const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_on: { type: Date },
  updated_on: { type: Date },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: String,
  open: Boolean,
  status_text: String
});

module.exports = mongoose.model('Issue', IssueSchema);