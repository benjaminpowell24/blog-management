import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//User schema model
const UserSchema = new mongoose.Schema({
    fullname : {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
},{
    timestamps: true
});

//Check if email exists
UserSchema.statics.findEmail = async({email}) => {
    const doesEmailExist = await UserModel.findOne({email});

    if(doesEmailExist) throw new Error(`User with email already exists`);

    return false;
}

//Check if email exists and if password hashes match
UserSchema.statics.findEmailAndPassword = async ({email, password}) => {
    const user = await UserModel.findOne({ email });

    if(!user) throw new Error(`User does not exist`);

    //compare password hash
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if(!doesPasswordMatch) throw new Error(`Wrong Password`);

    return user;
}

//generate jwt
UserSchema.methods.generateToken = function(){
    return Jwt.sign({user: this._id.toString()}, "Blog", {
        expiresIn: '1h'
    });
}

UserSchema.pre("save", function(next){
    const user = this;
    //if password modified salt and hash
    if(!user.isModified) return next();
    if(user.password){
        bcrypt.genSalt(8, (error, salt) => {
            if (error) return next(error);

            bcrypt.hash(user.password, salt, (error, hash)=> {
                if(error) return next(error);
                user.password = hash;
                return next();
            });
        });
    }else{
        return next();
    }
})

export const UserModel = mongoose.model("Users", UserSchema);