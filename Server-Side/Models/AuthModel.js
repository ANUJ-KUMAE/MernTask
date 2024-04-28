const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

//Encrypting password before saving user

AuthSchema.pre("save", async function(next) {

    const user = this;

    if(!user.isModified("password"))
    {
       next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_Password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_Password;

    } catch (error) {
        next(error);
    }

})

//Cpmare Password
AuthSchema.methods.ComparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

AuthSchema.methods.generateToken = async function() {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.log(error);
    }
}


const AuthModel = new mongoose.model('AuthModel', AuthSchema);
module.exports = AuthModel;