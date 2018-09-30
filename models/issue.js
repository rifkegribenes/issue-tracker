const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Parent = mongoose.model('Parent', parentSchema);
var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] })
parent.children[0].name = 'Matthew';

// `parent.children[0].save()` is a no-op, it triggers middleware but
// does **not** actually save the subdocument. You need to save the parent
// doc.
parent.save(callback);

const ProjectSchema = new Schema({
  issues: toys: [ToySchema],
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

module.exports = mongoose.model('Project', ProjectSchema);