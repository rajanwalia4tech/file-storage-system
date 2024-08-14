const Joi = require("joi");

class FileValidation{
    async downloadFile(req,res,next){
        const schema = Joi.object({
            fileId: Joi.string().required().messages({
                'any.required': 'fileId is required.',
                'string.empty': 'fileId cannot be empty.'
            })
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        next();
    }
}

module.exports = new FileValidation();