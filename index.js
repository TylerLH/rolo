/* 
*  Rolo.js by Tyler Hughes
*  A roles plugin for Mongoose.js
*
*  @module rolo
*  @requires underscore
*/

var _ = require('underscore');

/*
*  The plugin function is added to mongoose
*  @param   schema  {object}  - The schema to which the plugin is being added
*  @param  options {object}  - Options passed when plugin is added
*/
function Rolo (schema, options) {
  /* Roles array
  *
  * @property roles
  * @type {Array}
  * @default []
  */
  schema.add({roles: [String]});

  /*
  *  Add a role to roles array
  *
  *  @method addRole
  *  @param {String} role The role to be added
  *  @return {Boolean} Returns true if role was added, false if not
  */
  function addRole(role) {
    role = role.toLowerCase();
    if (this.hasRole(role)) return false;
    this.roles.push(role);
    return true;
  }
  schema.methods.addRole = addRole;

  /*
  *  Remove a role from roles array
  *
  *  @method removeRole
  *  @param {String} role The role to be removed
  *  @return {Boolean} Returns true if role was removed, false if not
  */
  function removeRole(role) {
    role = role.toLowerCase();
    if ( this.hasRole(role) ) {
      this.roles = _.without(this.roles, role);
      return true;
    } else {
      return false;
    }
  }
  schema.methods.removeRole = removeRole;

  /*
  *  Check to see if model has role
  *
  *  @method hasRole
  *  @param {String} role The role to check for
  *  @return {Boolean} Returns true if model has role, false if not 
  */
  function hasRole(role) {
    return _.contains(this.roles, role.toLowerCase());
  }
  schema.methods.hasRole = hasRole;

}

module.exports = exports = Rolo;