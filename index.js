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
  *  @async
  *  @param {String} role The role to be added
  *  @param {Function}[callback] done Callback function
  */
  function addRole(role, done) {
    role = role.toLowerCase();
    if (this.hasRole(role)) return done(null, false);
    this.roles.push(role);
    this.save(function(err) {
      if (err) return done(err);
      done(null, true);
    });
  }
  schema.methods.addRole = addRole;

  /*
  *  Remove a role from roles array
  *
  *  @method removeRole
  *  @async
  *  @param {String} role The role to be removed
  *  @param {Function}[callback] done Callback function
  */
  function removeRole(role, done) {
    role = role.toLowerCase();
    if ( this.hasRole(role) ) {
      this.roles = _.without(this.roles, role);
      this.save(function(err) {
        if (err) return done(err);
        done(null, true);
      });
    } else {
      return done(null, false);
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