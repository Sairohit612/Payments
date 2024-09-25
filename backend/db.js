const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://spysherly:Xylophine@612@cluster0.esgdy.mongodb.net/")

const userSchema = mongoose.schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String

})

const User = mongoose.model('User', userSchema);

const accountSchema = mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true},
    
    balance: {
    type: Number,
    required:true}
    });
    
    const Account = mongoose.model('Account', accountSchema);
    
    module.exports = {
    User,
    Account
    };
