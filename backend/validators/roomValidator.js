import Joi from "joi";
import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi);

export const createRoomValidator = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Le nom doit être une chaîne de caractères",
    "string.empty": "Vous devez renseigner le champ name",
    "any.required": "Le champ name est obligatoire"
  }),
  photo: Joi.string().trim().optional().allow('').messages({
    "string.empty": "La photo de la chambre doit être renseignée",
    "any.required": "La photo est obligatoire"
  }),
  category: Joi.objectId().required().messages({
    "any.required": "La référence à la catégorie est requise",
    "string.base": "L'ID de la catégorie doit être une chaîne valide.",
    "string.empty": "L'ID de la catégorie ne peut pas être vide.",
    "string.pattern.base": "L'ID de la catégorie doit être un ObjectId MongoDB valide."
  }),
  code: Joi.string().trim().required().messages({
    "string.empty": "Le code doit être renseigné",
    "any.required": "Le code est requis"
  }),
  capacity: Joi.number().required().messages({
    "number.base": "La capacité est une valeur numérique",
    "number.empty": "La capacité ne doit pas être vide",
    "any.required": "La capacité est un champ requis"
  }),
  description: Joi.string().trim().required().messages({
    "string.base": "La description est une suite de chaînes de caractères, veuillez modifier l'entrée",
    "string.empty": "La description ne doit pas être vide",
    "any.required": "La description est requise"
  })
});

export const updateRoomValidator = Joi.object({
  name: Joi.string().trim().optional().messages({
    "string.base": "Le nom doit être une chaîne de caractères",
    "string.empty": "Vous devez renseigner le champ name"
  }),
  photo: Joi.alternatives().try(
    Joi.string().trim().optional().allow(''),
    Joi.string().uri().optional()
  ).messages({
    "string.empty": "La photo de la chambre doit être renseignée"
  }),
  category: Joi.objectId().optional().messages({
    "string.base": "L'ID de la catégorie doit être une chaîne valide.",
    "string.empty": "L'ID de la catégorie ne peut pas être vide.",
    "string.pattern.base": "L'ID de la catégorie doit être un ObjectId MongoDB valide."
  }),
  code: Joi.string().trim().optional().messages({
    "string.empty": "Le code doit être renseigné"
  }),
  capacity: Joi.number().optional().messages({
    "number.base": "La capacité est une valeur numérique",
    "number.empty": "La capacité ne doit pas être vide"
  }),
  description: Joi.string().trim().optional().messages({
    "string.base": "La description est une suite de chaînes de caractères, veuillez modifier l'entrée",
    "string.empty": "La description ne doit pas être vide"
  })
}).min(1).messages({
  "object.min": "Introduisez au moins un champ pour la mise à jour"
});
