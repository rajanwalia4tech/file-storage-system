const Joi = require("joi");

class UserValidation{
    async validateSignup(req,res,next){
        const schema = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'name is required.',
                'string.empty': 'name cannot be empty.'
            }),
            email: Joi.string().required().messages({
                'any.required': 'email is required.',
                'string.empty': 'email cannot be empty.'
            }),
            password : Joi.string().required().messages({
                'any.required': 'password is required.',
                'string.empty': 'password cannot be empty.'
            })
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
    
    async validateLogin(req,res,next){
        const schema = Joi.object({
            email: Joi.string().required().messages({
                'any.required': 'email is required.',
                'string.empty': 'email cannot be empty.'
            }),
            password : Joi.string().required().messages({
                'any.required': 'password is required.',
                'string.empty': 'password cannot be empty.'
            })
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    };
    
}

module.exports = new UserValidation();