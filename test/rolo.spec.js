var expect    = require('chai').expect;
var mongoose  = require('mongoose');
var User      = require('./models/user');

describe('Rolo', function () {
  var currentUser;

  before('connect to database', function() {
    mongoose.connect("mongodb://localhost/rolo_test");
  });

  before('create user instance', function(done) {
    User.create({name: "Tyler Hughes"}, function (err, user) {
      if (err) throw err;
      currentUser = user;
      done();
    });
  });

  describe('#addRole(role: String)', function() {
    it("should add role to model's roles array", function() {
      var length = currentUser.roles.length;
      currentUser.addRole('admin');
      expect(currentUser.roles).to.have.length(length+1);
    });
  });

  describe('#hasRole(role: String)', function() {
    it("should return true if user has role", function() {
      expect(currentUser.hasRole('admin')).to.equal(true);
    });

    it("should return false if user does not have role", function() {
      expect(currentUser.hasRole('notAdmin')).to.equal(false);
    });
  });

});