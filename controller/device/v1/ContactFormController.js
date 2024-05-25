/**
 * ContactFormController.js
 * @description : exports action methods for ContactForm.
 */

const ContactForm = require('../../../model/ContactForm');
const ContactFormSchemaKey = require('../../../utils/validation/ContactFormValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
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
    let createdContactForms = await dbService.create(ContactForm,dataToCreate);
    createdContactForms = { count: createdContactForms ? createdContactForms.length : 0 };
    return res.success({ data:{ count:createdContactForms.count || 0 } });
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
    let dataToUpdate = { ...req.body, };
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
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
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
    let dataToUpdate = { ...req.body, };
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

module.exports = {
  addContactForm,
  bulkInsertContactForm,
  updateContactForm,
  bulkUpdateContactForm,
  partialUpdateContactForm    
};