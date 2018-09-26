const mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
      type: String,
      required: true
    }
},
{
    timestamps: true,
    versionKey: false, // You should be aware of the outcome after set to false
    toObject: {
        transform: function (doc, ret) {
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.password;
        }
      },
      toJSON: {
        transform: function (doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.password;

        }
      }

}
);

// Hash the user's password before inserting a new user
userSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Compare password input to password saved in database
userSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


User =  mongoose.model('User', userSchema);



module.exports = User;
