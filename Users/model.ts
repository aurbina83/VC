import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface IUserModel extends app.i.IUser, mongoose.Document {
    hashPassword(password: string, cb: (err, hash: string) => any);
    generateJWT(): string;
    comparePassword(password: string, cb: (err, isMatch: boolean) => any);
}

let userSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
    password: { type: String },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number},
    currentLocation: {type: String},
    branchService: {type: String},
    paygrade: {type: String},
    theater: {type: String},
    imgUrl: {type: String},
    mos: {type: String},

    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

userSchema.method('hashPassword', function(password, done) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return done (err);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return done (err);
            done(null, hash);
        });
    });
});

userSchema.method('comparePassword', function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
});

userSchema.method('generateJWT', function() {
  return jwt.sign({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    _id: this._id
  }, process.env.JWT_SECRET);
});

export let User = mongoose.model<IUserModel>('User', userSchema);
