const {userRepository} = require("../repository");
const jwt = require("jsonwebtoken");

class userService{

    async signup(name, email, password){
        const user = await userRepository.getUserByEmail(email);
        if(user){
            throw new Error("User with this email already exists");
        }
        await userRepository.create({name, email, password});
        return {data : {name,email}, success : true, message : "User created Successfully, Please login now."}
    }

    async login(email,password){
        const user = await userRepository.getUserByEmail(email);
        if(user == null)
            throw new Error("User with this email doesn't exist ");

        await userRepository.validatePassword(user, password);

        // generate the access token
        const accessToken = await this.generateToken(user._id, user.name, user.email);
        return {success:true, data : {accessToken }, message : "fetched the accessToken successfully"};
    }

    async generateToken(userId, name, email){
        return await jwt.sign({userId, name, email}, process.env.JWT_SECRET);
    }

    async getUserInfo(userId){
        const user = await userRepository.getUserById(userId);
        return {
            success:true,
            data :{
                user
            },
            message : "Fetched the user information successfully"
        };
    }
}

module.exports = new userService();