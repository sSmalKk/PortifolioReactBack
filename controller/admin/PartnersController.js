/**
 * PartnersController.js
 * @description : exports action methods for Partners.
 */

const Partners = require('../../model/Partners');
const PartnersSchemaKey = require('../../utils/validation/PartnersValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Partners in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Partners. {status, message, data}
 */ 
const addPartners = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      PartnersSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Partners(dataToCreate);
    let createdPartners = await dbService.create(Partners,dataToCreate);
    return res.success({ data : createdPartners });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Partners in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Partnerss. {status, message, data}
 */
const bulkInsertPartners = async (req,res)=>{
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
    let createdPartnerss = await dbService.create(Partners,dataToCreate);
    createdPartnerss = { count: createdPartnerss ? createdPartnerss.length : 0 };
    return res.success({ data:{ count:createdPartnerss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Partners from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Partners(s). {status, message, data}
 */
const findAllPartners = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PartnersSchemaKey.findFilterKeys,
      Partners.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Partners, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPartnerss = await dbService.paginate( Partners,query,options);
    if (!foundPartnerss || !foundPartnerss.data || !foundPartnerss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPartnerss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Partners from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Partners. {status, message, data}
 */
const getPartners = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPartners = await dbService.findOne(Partners,query, options);
    if (!foundPartners){
      return res.recordNotFound();
    }
    return res.success({ data :foundPartners });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Partners.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPartnersCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PartnersSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPartners = await dbService.count(Partners,where);
    return res.success({ data : { count: countedPartners } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Partners with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Partners.
 * @return {Object} : updated Partners. {status, message, data}
 */
const updatePartners = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PartnersSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPartners = await dbService.updateOne(Partners,query,dataToUpdate);
    if (!updatedPartners){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPartners });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Partners with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Partnerss.
 * @return {Object} : updated Partnerss. {status, message, data}
 */
const bulkUpdatePartners = async (req,res)=>{
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
    let updatedPartners = await dbService.updateMany(Partners,filter,dataToUpdate);
    if (!updatedPartners){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPartners } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Partners with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Partners.
 * @return {obj} : updated Partners. {status, message, data}
 */
const partialUpdatePartners = async (req,res) => {
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
      PartnersSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPartners = await dbService.updateOne(Partners, query, dataToUpdate);
    if (!updatedPartners) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPartners });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Partners from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Partners.
 * @return {Object} : deactivated Partners. {status, message, data}
 */
const softDeletePartners = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPartners = await dbService.updateOne(Partners, query, updateBody);
    if (!updatedPartners){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPartners });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Partners from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Partners. {status, message, data}
 */
const deletePartners = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedPartners = await dbService.deleteOne(Partners, query);
    if (!deletedPartners){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPartners });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Partners in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPartners = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedPartners = await dbService.deleteMany(Partners,query);
    if (!deletedPartners){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedPartners } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Partners from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Partners.
 * @return {Object} : number of deactivated documents of Partners. {status, message, data}
 */
const softDeleteManyPartners = async (req,res) => {
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
    let updatedPartners = await dbService.updateMany(Partners,query, updateBody);
    if (!updatedPartners) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedPartners } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPartners,
  bulkInsertPartners,
  findAllPartners,
  getPartners,
  getPartnersCount,
  updatePartners,
  bulkUpdatePartners,
  partialUpdatePartners,
  softDeletePartners,
  deletePartners,
  deleteManyPartners,
  softDeleteManyPartners    
};