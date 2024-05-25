/**
 * ServiceController.js
 * @description : exports action methods for Service.
 */

const Service = require('../../model/Service');
const ServiceSchemaKey = require('../../utils/validation/ServiceValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Service in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Service. {status, message, data}
 */ 
const addService = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ServiceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Service(dataToCreate);
    let createdService = await dbService.create(Service,dataToCreate);
    return res.success({ data : createdService });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Service in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Services. {status, message, data}
 */
const bulkInsertService = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdServices = await dbService.create(Service,dataToCreate);
    createdServices = { count: createdServices ? createdServices.length : 0 };
    return res.success({ data:{ count:createdServices.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Service from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Service(s). {status, message, data}
 */
const findAllService = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ServiceSchemaKey.findFilterKeys,
      Service.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Service, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundServices = await dbService.paginate( Service,query,options);
    if (!foundServices || !foundServices.data || !foundServices.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundServices });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Service from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Service. {status, message, data}
 */
const getService = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundService = await dbService.findOne(Service,query, options);
    if (!foundService){
      return res.recordNotFound();
    }
    return res.success({ data :foundService });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Service.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getServiceCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ServiceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedService = await dbService.count(Service,where);
    return res.success({ data : { count: countedService } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Service with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Service.
 * @return {Object} : updated Service. {status, message, data}
 */
const updateService = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ServiceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedService = await dbService.updateOne(Service,query,dataToUpdate);
    if (!updatedService){
      return res.recordNotFound();
    }
    return res.success({ data :updatedService });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Service with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Services.
 * @return {Object} : updated Services. {status, message, data}
 */
const bulkUpdateService = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedService = await dbService.updateMany(Service,filter,dataToUpdate);
    if (!updatedService){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedService } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Service with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Service.
 * @return {obj} : updated Service. {status, message, data}
 */
const partialUpdateService = async (req,res) => {
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
      ServiceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedService = await dbService.updateOne(Service, query, dataToUpdate);
    if (!updatedService) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedService });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Service from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Service.
 * @return {Object} : deactivated Service. {status, message, data}
 */
const softDeleteService = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedService = await dbService.updateOne(Service, query, updateBody);
    if (!updatedService){
      return res.recordNotFound();
    }
    return res.success({ data:updatedService });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Service from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Service. {status, message, data}
 */
const deleteService = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedService = await dbService.deleteOne(Service, query);
    if (!deletedService){
      return res.recordNotFound();
    }
    return res.success({ data :deletedService });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Service in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyService = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedService = await dbService.deleteMany(Service,query);
    if (!deletedService){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedService } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Service from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Service.
 * @return {Object} : number of deactivated documents of Service. {status, message, data}
 */
const softDeleteManyService = async (req,res) => {
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
    let updatedService = await dbService.updateMany(Service,query, updateBody);
    if (!updatedService) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedService } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addService,
  bulkInsertService,
  findAllService,
  getService,
  getServiceCount,
  updateService,
  bulkUpdateService,
  partialUpdateService,
  softDeleteService,
  deleteService,
  deleteManyService,
  softDeleteManyService    
};