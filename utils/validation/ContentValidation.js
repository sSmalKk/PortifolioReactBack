/**
 * ContentValidation.js
 * @description :: validate each post and put request as per Content model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Content */
exports.schemaKeys = joi.object({
  Language: joi.string().allow(null).allow(''),
  Content: joi.array().items(),
  Source: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Data: joi.array().items(joi.object())
}).unknown(true);

/** validation keys and properties of Content for updation */
exports.updateSchemaKeys = joi.object({
  Language: joi.string().allow(null).allow(''),
  Content: joi.array().items(),
  Source: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Data: joi.array().items(joi.object()),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Content for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Language: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Content: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Source: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
