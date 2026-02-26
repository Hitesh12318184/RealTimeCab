const mongoose = require('mongoose');
const User = require('./models/user.model');
require('dotenv').config();

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'hiteshparida614@gmail.com';
        const user = await User.findOne({ email }).select('+password');

        if (user) {
            console.log('User found:', user.email);
            console.log('Is Active:', user.isActive);
            console.log('Role:', user.role);
            // We can also test the password 'password123' if that's what we expect, but let's test if we can login with password123
            const isValid1 = await user.comparePassword('password123');
            console.log('Password is password123?', isValid1);
            const isValid2 = await user.comparePassword('admin123');
            console.log('Password is admin123?', isValid2);
            const isValid3 = await user.comparePassword('user123');
            console.log('Password is user123?', isValid3);
        } else {
            console.log('User not found.');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkUser();
