var expect    = require('chai').expect;
var mongoose  = require('mongoose');
var User      = require('./models/user');

describe('Rolo', function () {
  var currentUser;

  // Connect to db before tests run
  before('connect to database', function() {
    mongoose.connect("mongodb://localhost/rolo_test");
  });

  // Create currentUser before tests run
  before('create user instance', function(done) {
    User.create({name: "Tyler Hughes"}, function (err, user) {
      if (err) throw err;
      currentUser = user;
      done();
    });
  });

  // Remove all user records after tests run
  after('remove all users', function(done) {
    User.remove({}, function (err) {
      if (err) throw err;
      mongoose.disconnect();
      done();
    });
  });

  /*
  *  Test adding a role
  */

  describe('~addRole(role: String)', function() {

    before('add admin role to user', function(done) {
      currentUser.addRole('admin', function(err, success) {
        if (err) throw err;
        done();
      });
    });

    it("should add role to model's roles array", function() {
      expect(currentUser.roles).to.have.length(1);
    });

    it("should not add duplicate roles to a model", function() {
      currentUser.addRole('admin', function(err, success) {
        if (err) throw err;
        expect(success).to.equal(false);
        expect(currentUser.roles).to.have.length(1);
      });
    });

  });

  /*
  *  Test for role existence
  */

  describe('~hasRole(role: String)', function() {

    it("should return true if user has role", function() {
      expect(currentUser.hasRole('admin')).to.equal(true);
    });

    it("should return false if user does not have role", function() {
      expect(currentUser.hasRole('notAdmin')).to.equal(false);
    });
  });

  /*
  *  Test removing role from model
  */

  describe('~removeRole(role: String)', function() {
    it("should successfully remove a role if assigned", function() {
      var length = currentUser.roles.length;
      currentUser.removeRole('admin', function(err, success) {
        if (err) throw err;
        expect(success).to.equal(true);
        expect(currentUser.roles.length).to.equal(length-1);
      });
    });
  });

});