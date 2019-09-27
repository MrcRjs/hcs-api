const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user: {
        name: {
            type: 'String',
            required: true,
            trim: true,
        },
        email: {
            type: 'String',
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: 'String',
            required: true,
            trim: true
        }
    },
    tasks: [
        {
            title: {
                type: 'String',
                required: true,
                trim: true,
            },
            created: {
                type: 'Date',
                required: true,
                default: Date.now,
                setDefaultsOnInsert: true
            }
        }
    ]
});

UserSchema.pre('save', function (next) {
    var account = this;

    // Only hash the password if it has been modified (or is new)
    if (!account.isModified('user')) return next();

    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Hash the password using our new salt
        bcrypt.hash(account.user.password, salt, function (err, hash) {
            if (err) return next(err);

            // Override the cleartext password with the hashed one
            account.user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.user.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
