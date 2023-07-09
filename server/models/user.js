const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Please enter a valid email address',
        },
    },
    password: {
        required: true,
        type: String,
        validate: {
            validator: (value) => {
                const re = /^[a-zA-Z]\w{8,15}$/;
                return value.match(re);
            },
            message: 'Please enter a valid password',
        },
    },
    address: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: "user",
    },
    // CART
});

const User = mongoose.model("User", userSchema);

module.exports = User;