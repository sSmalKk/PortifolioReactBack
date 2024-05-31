/**
 * BlogValidation.js
 * @description :: validate each post and put request as per Blog model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Blog */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  alternativeHeadline: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  publishDate: joi.string().allow(null).allow(''),
  author: joi.object({
    name:joi.string(),
    image:joi.string(),
    email:joi.string()
  }),
  publisher: joi.object({
    name:joi.string(),
    url:joi.string(),
    logo:joi.string()
  }),
  articleSection: joi.string().allow(null).allow(''),
  articleBody: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  slug: joi.string().allow(null).allow(''),
  url: joi.string().allow(null).allow(''),
  isDraft: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of Blog for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  alternativeHeadline: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  publishDate: joi.string().allow(null).allow(''),
  author: joi.object({
    name:joi.string(),
    image:joi.string(),
    email:joi.string()
  }),
  publisher: joi.object({
    name:joi.string(),
    url:joi.string(),
    logo:joi.string()
  }),
  articleSection: joi.string().allow(null).allow(''),
  articleBody: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  slug: joi.string().allow(null).allow(''),
  url: joi.string().allow(null).allow(''),
  isDraft: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Blog for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      alternativeHeadline: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      publishDate: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      author: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      publisher: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      articleSection: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      articleBody: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      slug: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      url: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDraft: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      createdAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updatedAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updatedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      addedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
