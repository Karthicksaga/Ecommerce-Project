const mongoose = require('mongoose');
const validator = require('validator');

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        validate(value) {
            if (Number.isNaN(value)) {
                throw new Error('Phone Number is invalid');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    starValue: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['active', 'terminated'],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    }
}, {
    timestamps: true
})

// Delete admin transactions when admin is removed
// adminSchema.pre('remove', async function (next) {
//     const admin = this;
//     await Transaction.deleteMany({ owner: admin._id });
//     next();
// });

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;