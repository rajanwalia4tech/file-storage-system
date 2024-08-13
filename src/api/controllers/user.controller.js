class UserController{
    async login(req, res){

        return res.status(200).send({success:true, message:"fetched the token"});
    }
}

module.exports = new UserController();