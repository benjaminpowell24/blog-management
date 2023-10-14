import joi from "joi";

export const validatePost = (post) => {
    const schema = joi.object({
        title: joi.string().min(3).max(70),
        topic: joi.string().min(3).max(70),
        content: joi.string().min(20).max(2000)
    });

    return schema.validateAsync(post);

}
