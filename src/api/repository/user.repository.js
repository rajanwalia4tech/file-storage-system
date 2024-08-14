const {User} = require("../models");
class UserRepository{

    async create(payload){
        const newUser = new User(payload)
        await newUser.save();
        return newUser;
    }

    async getUserById(userId){
        const user = await User.findById(userId);
        if(!user) throw new Error("user not found");
        return user;
    }

    async getUserByEmail(email){
        const user = await User.findOne({email});
        if(user == null) return null;
        return user;
    }

    async validatePassword(user, enteredPassword){
        const isPasswordMatch = await user.comparePassword(enteredPassword);
        if(!isPasswordMatch)
            throw Error("Invalid email or password");

        return true; // means password matched successfully
    }
}

module.exports = new UserRepository();