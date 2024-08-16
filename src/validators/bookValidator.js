import Joi from "joi";

const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    published_date: Joi.date().required()
});

export default bookSchema;