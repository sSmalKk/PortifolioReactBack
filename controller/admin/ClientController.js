/**
 * ClientController.js
 * @description : exports action methods for Client.
 */

const Client = require('../../model/Client');
const ClientSchemaKey = require('../../utils/validation/ClientValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Client in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Client. {status, message, data}
 */ 
const addClient = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ClientSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Client(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Client,[ 'Ip' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdClient = await dbService.create(Client,dataToCreate);
    return res.success({ data : createdClient });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Client in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Clients. {status, message, data}
 */
const bulkInsertClient = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Client,[ 'Ip' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdClients = await dbService.create(Client,dataToCreate);
    createdClients = { count: createdClients ? createdClients.length : 0 };
    return res.success({ data:{ count:createdClients.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Client from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Client(s). {status, message, data}
 */
const findAllClient = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ClientSchemaKey.findFilterKeys,
      Client.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Client, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundClients = await dbService.paginate( Client,query,options);
    if (!foundClients || !foundClients.data || !foundClients.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundClients });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Client from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Client. {status, message, data}
 */
const getClient = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundClient = await dbService.findOne(Client,query, options);
    if (!foundClient){
      return res.recordNotFound();
    }
    return res.success({ data :foundClient });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Client.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getClientCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ClientSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedClient = await dbService.count(Client,where);
    return res.success({ data : { count: countedClient } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Client with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Client.
 * @return {Object} : updated Client. {status, message, data}
 */
const updateClient = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ClientSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Client,[ 'Ip' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedClient = await dbService.updateOne(Client,query,dataToUpdate);
    if (!updatedClient){
      return res.recordNotFound();
    }
    return res.success({ data :updatedClient });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Client with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Clients.
 * @return {Object} : updated Clients. {status, message, data}
 */
const bulkUpdateClient = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Client,[ 'Ip' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedClient = await dbService.updateMany(Client,filter,dataToUpdate);
    if (!updatedClient){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedClient } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Client with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Client.
 * @return {obj} : updated Client. {status, message, data}
 */
const partialUpdateClient = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ClientSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Client,[ 'Ip' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedClient = await dbService.updateOne(Client, query, dataToUpdate);
    if (!updatedClient) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedClient });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Client from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Client.
 * @return {Object} : deactivated Client. {status, message, data}
 */
const softDeleteClient = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedClient = await dbService.updateOne(Client, query, updateBody);
    if (!updatedClient){
      return res.recordNotFound();
    }
    return res.success({ data:updatedClient });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Client from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Client. {status, message, data}
 */
const deleteClient = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedClient = await dbService.deleteOne(Client, query);
    if (!deletedClient){
      return res.recordNotFound();
    }
    return res.success({ data :deletedClient });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Client in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyClient = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedClient = await dbService.deleteMany(Client,query);
    if (!deletedClient){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedClient } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Client from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Client.
 * @return {Object} : number of deactivated documents of Client. {status, message, data}
 */
const softDeleteManyClient = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedClient = await dbService.updateMany(Client,query, updateBody);
    if (!updatedClient) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedClient } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addClient,
  bulkInsertClient,
  findAllClient,
  getClient,
  getClientCount,
  updateClient,
  bulkUpdateClient,
  partialUpdateClient,
  softDeleteClient,
  deleteClient,
  deleteManyClient,
  softDeleteManyClient    
};