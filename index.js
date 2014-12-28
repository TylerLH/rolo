// Rolo.js by Tyler Hughes
// A roles plugin for Mongoose.js

var _ = require('underscore');

/*
*  The plugin function is added to mongoose
*  @param   schema  {object}  - The schema to which the plugin is being added
*  @params  options {object}  - Options passed when plugin is added
*/
var plugin = function plugin (schema, options) {
  schema.add({roles: [String]});

  schema.methods.addRole = function addRole(role) {
    this.roles.push(role);
  };

  schema.methods.hasRole = function hasRole(role) {
    return _.contains(this.roles, role);
  };
};

module.exports = exports = plugin;