const {userService} =  require("../services");
class UserController{

    async signup(req, res){
        try{
            const {name, email, password} = req.body;
            const response = await userService.signup(name, email, password);
            return res.status(200).send(response);
        }catch(err){
            console.error("error while signup ", err.message);
            return res.status(400).send({success:false,message : err.message});
        }
    }

    async login(req, res){
        try{
            const {email, password} = req.body;
            const response = await userService.login(email, password);
            return res.status(200).send(response);
        }catch(err){
            console.error("error while login ", err.message);
            return res.status(400).send({success:false,message : err.message});
        }

    }
}

module.exports = new UserController();