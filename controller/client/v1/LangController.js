/**
 * LangController.js
 * @description : exports action methods for Lang.
 */

const Lang = require('../../../model/Lang');
const LangSchemaKey = require('../../../utils/validation/LangValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Lang from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Lang(s). {status, message, data}
 */
const findAllLang = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      LangSchemaKey.findFilterKeys,
      Lang.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Lang, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundLangs = await dbService.paginate( Lang,query,options);
    if (!foundLangs || !foundLangs.data || !foundLangs.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundLangs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Lang from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Lang. {status, message, data}
 */
const getLang = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundLang = await dbService.findOne(Lang,query, options);
    if (!foundLang){
      return res.recordNotFound();
    }
    return res.success({ data :foundLang });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Lang.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getLangCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      LangSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedLang = await dbService.count(Lang,where);
    return res.success({ data : { count: countedLang } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  findAllLang,
  getLang,
  getLangCount    
};