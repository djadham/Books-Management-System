import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roles: Joi.string().valid('author', 'user', 'publisher').default('user')
});

export const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match the password'
    }),
    roles: Joi.string().valid('author', 'user', 'publisher').required().default('user')
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    published_date: Joi.date().required()
});

export const BookImageSchema = Joi.object({
    bookId: Joi.string().required(),
    file: Joi.object({
        originalname: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png').required(), // Accept JPEG and PNG images
        size: Joi.number().max(5 * 1024 * 1024).required() // Maximum size 5MB
      }),
      description: Joi.string(),
      file_type: Joi.string()
});

export const GenreSchema = Joi.object({
    name: Joi.string().required()
});

export const BookGenresSchema = Joi.object({
    bookId: Joi.string().required(),
    genreId: Joi.string().required()
});

export const BookAuthorsSchema = Joi.object({
    bookId: Joi.string().required(),
    authorId: Joi.string().required()
});

export const RatingsSchema = Joi.object({
    bookId: Joi.string().required(),
    userId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required()
})

export const ReviewsSchema = Joi.object({
    bookId: Joi.string().required(),
    userId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string()
})

export const BookPublisherSchema = Joi.object({
    bookId: Joi.string().required(),
    publisherId: Joi.string().required()
})