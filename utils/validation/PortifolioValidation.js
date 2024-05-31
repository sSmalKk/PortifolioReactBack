/**
 * PortifolioValidation.js
 * @description :: validate each post and put request as per Portifolio model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Portifolio */
exports.schemaKeys = joi.object({
  Link: joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).allow(null).allow(''),
  Titulo: joi.string().required(),
  Company: joi.string().required(),
  Content: joi.string().required(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean().required(),
  createdAt: joi.date().options({ convert: true }).required(),
  updatedAt: joi.date().options({ convert: true }).required(),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  initialDate: joi.date().options({ convert: true }).allow(null).allow(''),
  finalDate: joi.date().options({ convert: true }).allow(null).allow(''),
  progress: joi.number().integer().required(),
  image: joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).required()
}).unknown(true);

/** validation keys and properties of Portifolio for updation */
exports.updateSchemaKeys = joi.object({
  Link: joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).allow(null).allow(''),
  Titulo: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  Company: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  Content: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  isDeleted: joi.boolean(),
  isActive: joi.boolean().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  createdAt: joi.date().options({ convert: true }).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  updatedAt: joi.date().options({ convert: true }).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  initialDate: joi.date().options({ convert: true }).allow(null).allow(''),
  finalDate: joi.date().options({ convert: true }).allow(null).allow(''),
  progress: joi.number().integer().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  image: joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Portifolio for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Link: joi.alternatives().try(joi.array().items(),joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),joi.object()),
      Titulo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Company: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Content: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      createdAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updatedAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      addedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      updatedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      initialDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      finalDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      progress: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
