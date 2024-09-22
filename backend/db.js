const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://spysherly:Xylophine@612@cluster0.esgdy.mongodb.net/")

const userSchema = mongoose.schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String

})

const User = mongoose.model('User', userSchema);

module.exports = {
    User 
} 