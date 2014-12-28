var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var rolo      = require('../../.');

var schema = new Schema({
  name: String
});

schema.plugin(rolo);

module.exports = mongoose.model('User', schema);