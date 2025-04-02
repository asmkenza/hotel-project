import Joi from 'joi'



export const createCategoryValidator = Joi.object({
    name:Joi.string().trim().required().messages({'string.empty':'specify a name'})
}
)



export const updateCategoryValidator = Joi.object({
    name:Joi.string().trim().optional().messages({'string.empty': 'must specify a name '})
})
