/**
 * LangValidation.js
 * @description :: validate each post and put request as per Lang model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Lang */
exports.schemaKeys = joi.object({
  Language: joi.string().allow(null).allow(''),
  Source: joi.string().allow(null).allow(''),
  Content: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Lang for updation */
exports.updateSchemaKeys = joi.object({
  Language: joi.string().allow(null).allow(''),
  Source: joi.string().allow(null).allow(''),
  Content: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Lang for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Language: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Source: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Content: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
