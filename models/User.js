let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let saltRounds = 10;
let Schema = mongoose.Schema;

// Usershema define how user is stored in db
var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash password using bcrypt
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash;
        next();
    });
  } else {
    return next();
  }
});

// Compare password to database for logging in
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    console.log(pw);
    console.log(this.password);
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

// Get user by id for serialization
module.exports.getUserById = function(id, callback){
  User.findById(id,callback);
}

// Export the model
module.exports = mongoose.model('User', UserSchema);
