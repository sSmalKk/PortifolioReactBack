/**
 * Chat_messageController.js
 * @description : exports action methods for Chat_message.
 */

const Chat_message = require('../../../model/Chat_message');
const Chat_messageSchemaKey = require('../../../utils/validation/Chat_messageValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Chat_message in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Chat_message. {status, message, data}
 */ 
const addChat_message = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Chat_messageSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Chat_message(dataToCreate);
    let createdChat_message = await dbService.create(Chat_message,dataToCreate);
    return res.success({ data : createdChat_message });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Chat_message in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Chat_messages. {status, message, data}
 */
const bulkInsertChat_message = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdChat_messages = await dbService.create(Chat_message,dataToCreate);
    createdChat_messages = { count: createdChat_messages ? createdChat_messages.length : 0 };
    return res.success({ data:{ count:createdChat_messages.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Chat_message from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Chat_message(s). {status, message, data}
 */
const findAllChat_message = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chat_messageSchemaKey.findFilterKeys,
      Chat_message.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Chat_message, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChat_messages = await dbService.paginate( Chat_message,query,options);
    if (!foundChat_messages || !foundChat_messages.data || !foundChat_messages.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChat_messages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Chat_message from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Chat_message. {status, message, data}
 */
const getChat_message = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChat_message = await dbService.findOne(Chat_message,query, options);
    if (!foundChat_message){
      return res.recordNotFound();
    }
    return res.success({ data :foundChat_message });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Chat_message.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChat_messageCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chat_messageSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChat_message = await dbService.count(Chat_message,where);
    return res.success({ data : { count: countedChat_message } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Chat_message with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Chat_message.
 * @return {Object} : updated Chat_message. {status, message, data}
 */
const updateChat_message = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Chat_messageSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChat_message = await dbService.updateOne(Chat_message,query,dataToUpdate);
    if (!updatedChat_message){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChat_message });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Chat_message with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Chat_messages.
 * @return {Object} : updated Chat_messages. {status, message, data}
 */
const bulkUpdateChat_message = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedChat_message = await dbService.updateMany(Chat_message,filter,dataToUpdate);
    if (!updatedChat_message){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChat_message } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Chat_message with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Chat_message.
 * @return {obj} : updated Chat_message. {status, message, data}
 */
const partialUpdateChat_message = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Chat_messageSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChat_message = await dbService.updateOne(Chat_message, query, dataToUpdate);
    if (!updatedChat_message) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChat_message });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

module.exports = {
  addChat_message,
  bulkInsertChat_message,
  findAllChat_message,
  getChat_message,
  getChat_messageCount,
  updateChat_message,
  bulkUpdateChat_message,
  partialUpdateChat_message    
};