/**
 * ContactFormController.js
 * @description : exports action methods for ContactForm.
 */

const ContactForm = require('../../model/ContactForm');
const ContactFormSchemaKey = require('../../utils/validation/ContactFormValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of ContactForm in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created ContactForm. {status, message, data}
 */ 
const addContactForm = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ContactFormSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new ContactForm(dataToCreate);
    let createdContactForm = await dbService.create(ContactForm,dataToCreate);
    return res.success({ data : createdContactForm });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of ContactForm in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created ContactForms. {status, message, data}
 */
const bulkInsertContactForm = async (req,res)=>{
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
    let createdContactForms = await dbService.create(ContactForm,dataToCreate);
    createdContactForms = { count: createdContactForms ? createdContactForms.length : 0 };
    return res.success({ data:{ count:createdContactForms.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of ContactForm from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found ContactForm(s). {status, message, data}
 */
const findAllContactForm = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ContactFormSchemaKey.findFilterKeys,
      ContactForm.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(ContactForm, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundContactForms = await dbService.paginate( ContactForm,query,options);
    if (!foundContactForms || !foundContactForms.data || !foundContactForms.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundContactForms });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of ContactForm from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found ContactForm. {status, message, data}
 */
const getContactForm = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundContactForm = await dbService.findOne(ContactForm,query, options);
    if (!foundContactForm){
      return res.recordNotFound();
    }
    return res.success({ data :foundContactForm });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of ContactForm.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getContactFormCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ContactFormSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedContactForm = await dbService.count(ContactForm,where);
    return res.success({ data : { count: countedContactForm } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of ContactForm with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ContactForm.
 * @return {Object} : updated ContactForm. {status, message, data}
 */
const updateContactForm = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ContactFormSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedContactForm = await dbService.updateOne(ContactForm,query,dataToUpdate);
    if (!updatedContactForm){
      return res.recordNotFound();
    }
    return res.success({ data :updatedContactForm });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of ContactForm with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated ContactForms.
 * @return {Object} : updated ContactForms. {status, message, data}
 */
const bulkUpdateContactForm = async (req,res)=>{
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
    let updatedContactForm = await dbService.updateMany(ContactForm,filter,dataToUpdate);
    if (!updatedContactForm){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedContactForm } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of ContactForm with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated ContactForm.
 * @return {obj} : updated ContactForm. {status, message, data}
 */
const partialUpdateContactForm = async (req,res) => {
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
      ContactFormSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedContactForm = await dbService.updateOne(ContactForm, query, dataToUpdate);
    if (!updatedContactForm) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedContactForm });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of ContactForm from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of ContactForm.
 * @return {Object} : deactivated ContactForm. {status, message, data}
 */
const softDeleteContactForm = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedContactForm = await dbService.updateOne(ContactForm, query, updateBody);
    if (!updatedContactForm){
      return res.recordNotFound();
    }
    return res.success({ data:updatedContactForm });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of ContactForm from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted ContactForm. {status, message, data}
 */
const deleteContactForm = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedContactForm = await dbService.deleteOne(ContactForm, query);
    if (!deletedContactForm){
      return res.recordNotFound();
    }
    return res.success({ data :deletedContactForm });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of ContactForm in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyContactForm = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedContactForm = await dbService.deleteMany(ContactForm,query);
    if (!deletedContactForm){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedContactForm } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of ContactForm from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of ContactForm.
 * @return {Object} : number of deactivated documents of ContactForm. {status, message, data}
 */
const softDeleteManyContactForm = async (req,res) => {
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
    let updatedContactForm = await dbService.updateMany(ContactForm,query, updateBody);
    if (!updatedContactForm) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedContactForm } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addContactForm,
  bulkInsertContactForm,
  findAllContactForm,
  getContactForm,
  getContactFormCount,
  updateContactForm,
  bulkUpdateContactForm,
  partialUpdateContactForm,
  softDeleteContactForm,
  deleteContactForm,
  deleteManyContactForm,
  softDeleteManyContactForm    
};