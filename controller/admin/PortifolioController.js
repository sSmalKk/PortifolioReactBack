/**
 * PortifolioController.js
 * @description : exports action methods for Portifolio.
 */

const Portifolio = require('../../model/Portifolio');
const PortifolioSchemaKey = require('../../utils/validation/PortifolioValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Portifolio in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Portifolio. {status, message, data}
 */ 
const addPortifolio = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{
        'createdAt':(Date.now()).toString(),
        'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      PortifolioSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Portifolio(dataToCreate);
    let createdPortifolio = await dbService.create(Portifolio,dataToCreate);
    return res.success({ data : createdPortifolio });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Portifolio in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Portifolios. {status, message, data}
 */
const bulkInsertPortifolio = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{
          'createdAt':(Date.now()).toString(),
          'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdPortifolios = await dbService.create(Portifolio,dataToCreate);
    createdPortifolios = { count: createdPortifolios ? createdPortifolios.length : 0 };
    return res.success({ data:{ count:createdPortifolios.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
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
    
/**
 * @description : update document of Portifolio with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Portifolio.
 * @return {Object} : updated Portifolio. {status, message, data}
 */
const updatePortifolio = async (req,res) => {
  try {
    let dataToUpdate = {
      ...{
        'updatedAt':(Date.now()).toString(),
        'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PortifolioSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPortifolio = await dbService.updateOne(Portifolio,query,dataToUpdate);
    if (!updatedPortifolio){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPortifolio });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Portifolio with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Portifolios.
 * @return {Object} : updated Portifolios. {status, message, data}
 */
const bulkUpdatePortifolio = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...{
          'updatedAt':(Date.now()).toString(),
          'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedPortifolio = await dbService.updateMany(Portifolio,filter,dataToUpdate);
    if (!updatedPortifolio){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPortifolio } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Portifolio with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Portifolio.
 * @return {obj} : updated Portifolio. {status, message, data}
 */
const partialUpdatePortifolio = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PortifolioSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPortifolio = await dbService.updateOne(Portifolio, query, dataToUpdate);
    if (!updatedPortifolio) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPortifolio });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Portifolio from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Portifolio.
 * @return {Object} : deactivated Portifolio. {status, message, data}
 */
const softDeletePortifolio = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPortifolio = await dbService.updateOne(Portifolio, query, updateBody);
    if (!updatedPortifolio){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPortifolio });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Portifolio from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Portifolio. {status, message, data}
 */
const deletePortifolio = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedPortifolio = await dbService.deleteOne(Portifolio, query);
    if (!deletedPortifolio){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPortifolio });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Portifolio in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPortifolio = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedPortifolio = await dbService.deleteMany(Portifolio,query);
    if (!deletedPortifolio){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedPortifolio } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Portifolio from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Portifolio.
 * @return {Object} : number of deactivated documents of Portifolio. {status, message, data}
 */
const softDeleteManyPortifolio = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPortifolio = await dbService.updateMany(Portifolio,query, updateBody);
    if (!updatedPortifolio) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedPortifolio } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPortifolio,
  bulkInsertPortifolio,
  findAllPortifolio,
  getPortifolio,
  getPortifolioCount,
  updatePortifolio,
  bulkUpdatePortifolio,
  partialUpdatePortifolio,
  softDeletePortifolio,
  deletePortifolio,
  deleteManyPortifolio,
  softDeleteManyPortifolio    
};