/**
 * ContentController.js
 * @description : exports action methods for Content.
 */

const Content = require('../../model/Content');
const ContentSchemaKey = require('../../utils/validation/ContentValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Content in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Content. {status, message, data}
 */ 
const addContent = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ContentSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Content(dataToCreate);
    let createdContent = await dbService.create(Content,dataToCreate);
    return res.success({ data : createdContent });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Content in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Contents. {status, message, data}
 */
const bulkInsertContent = async (req,res)=>{
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
    let createdContents = await dbService.create(Content,dataToCreate);
    createdContents = { count: createdContents ? createdContents.length : 0 };
    return res.success({ data:{ count:createdContents.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Content from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Content(s). {status, message, data}
 */
const findAllContent = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ContentSchemaKey.findFilterKeys,
      Content.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Content, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundContents = await dbService.paginate( Content,query,options);
    if (!foundContents || !foundContents.data || !foundContents.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundContents });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Content from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Content. {status, message, data}
 */
const getContent = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundContent = await dbService.findOne(Content,query, options);
    if (!foundContent){
      return res.recordNotFound();
    }
    return res.success({ data :foundContent });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Content.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getContentCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ContentSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedContent = await dbService.count(Content,where);
    return res.success({ data : { count: countedContent } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Content with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Content.
 * @return {Object} : updated Content. {status, message, data}
 */
const updateContent = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ContentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedContent = await dbService.updateOne(Content,query,dataToUpdate);
    if (!updatedContent){
      return res.recordNotFound();
    }
    return res.success({ data :updatedContent });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Content with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Contents.
 * @return {Object} : updated Contents. {status, message, data}
 */
const bulkUpdateContent = async (req,res)=>{
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
    let updatedContent = await dbService.updateMany(Content,filter,dataToUpdate);
    if (!updatedContent){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedContent } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Content with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Content.
 * @return {obj} : updated Content. {status, message, data}
 */
const partialUpdateContent = async (req,res) => {
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
      ContentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedContent = await dbService.updateOne(Content, query, dataToUpdate);
    if (!updatedContent) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedContent });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Content from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Content.
 * @return {Object} : deactivated Content. {status, message, data}
 */
const softDeleteContent = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedContent = await dbService.updateOne(Content, query, updateBody);
    if (!updatedContent){
      return res.recordNotFound();
    }
    return res.success({ data:updatedContent });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Content from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Content. {status, message, data}
 */
const deleteContent = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedContent = await dbService.deleteOne(Content, query);
    if (!deletedContent){
      return res.recordNotFound();
    }
    return res.success({ data :deletedContent });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Content in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyContent = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedContent = await dbService.deleteMany(Content,query);
    if (!deletedContent){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedContent } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Content from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Content.
 * @return {Object} : number of deactivated documents of Content. {status, message, data}
 */
const softDeleteManyContent = async (req,res) => {
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
    let updatedContent = await dbService.updateMany(Content,query, updateBody);
    if (!updatedContent) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedContent } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addContent,
  bulkInsertContent,
  findAllContent,
  getContent,
  getContentCount,
  updateContent,
  bulkUpdateContent,
  partialUpdateContent,
  softDeleteContent,
  deleteContent,
  deleteManyContent,
  softDeleteManyContent    
};