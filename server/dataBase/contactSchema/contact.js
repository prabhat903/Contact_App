const mongoose = require('mongoose');
/***********
 * Contact Schema For Mongo DB
 */
const ContactSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    phoneNum : Number,
    isActive : Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact',ContactSchema);