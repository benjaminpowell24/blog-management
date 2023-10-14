import joi from "joi";

//create and export function to validate user data sent to signin/signup api
export const validateSignup = (userData) => {
    const schema = joi.object({
        fullname: joi.string().required().min(2),
        email: joi.string().email(),
        password: joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')),
        address: joi.array().items(joi.object({details: joi.string(), for: joi.string()})),
        contact: joi.number().min(10).max(10)
    });

    return schema.validateAsync(userData);
}

export const validateSignin = (userData) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    });

    return schema.validateAsync(userData);
}