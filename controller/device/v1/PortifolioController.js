/**
 * PortifolioController.js
 * @description : exports action methods for Portifolio.
 */

const Portifolio = require('../../../model/Portifolio');
const PortifolioSchemaKey = require('../../../utils/validation/PortifolioValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
    
/**
 * @description : find all documents of Portifolio from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Portifolio(s). {status, message, data}
 */
const findAllPortifolio = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PortifolioSchemaKey.findFilterKeys,
      Portifolio.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Portifolio, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPortifolios = await dbService.paginate( Portifolio,query,options);
    if (!foundPortifolios || !foundPortifolios.data || !foundPortifolios.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPortifolios });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Portifolio from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Portifolio. {status, message, data}
 */
const getPortifolio = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPortifolio = await dbService.findOne(Portifolio,query, options);
    if (!foundPortifolio){
      return res.recordNotFound();
    }
    return res.success({ data :foundPortifolio });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Portifolio.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPortifolioCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PortifolioSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPortifolio = await dbService.count(Portifolio,where);
    return res.success({ data : { count: countedPortifolio } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  findAllPortifolio,
  getPortifolio,
  getPortifolioCount    
};