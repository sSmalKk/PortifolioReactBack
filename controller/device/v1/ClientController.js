/**
 * ClientController.js
 * @description : exports action methods for Client.
 */

const Client = require('../../../model/Client');
const ClientSchemaKey = require('../../../utils/validation/ClientValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
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
 * @description : update document of Client with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Client.
 * @return {Object} : updated Client. {status, message, data}
 */
const updateClient = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
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
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
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
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
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

module.exports = {
  addClient,
  bulkInsertClient,
  updateClient,
  bulkUpdateClient,
  partialUpdateClient    
};