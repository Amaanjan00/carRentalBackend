import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        emiratesid: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, min: 0 }
    },
    { timestamps: true }
);

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    // Hash password logic here (e.g., using bcrypt)
    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    // Compare password logic here (e.g., using bcrypt)
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
    // Generate JWT token logic here (e.g., using jsonwebtoken)
    const token = jwt.sign(
        { _id: this._id, email: this.email, name: this.name, emiratesid: this.emiratesid }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    return token;
}


export const User = mongoose.model('User', userSchema);
