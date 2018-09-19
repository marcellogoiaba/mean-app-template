var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastmame: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = module.exports = mongoose.model('User', userSchema);
