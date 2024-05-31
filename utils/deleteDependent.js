/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Lang = require('../model/Lang');
let Enterprise = require('../model/enterprise');
let Departments = require('../model/departments');
let Blog = require('../model/Blog');
let Client = require('../model/Client');
let ContactForm = require('../model/ContactForm');
let Service = require('../model/Service');
let Chat = require('../model/Chat');
let Chat_message = require('../model/Chat_message');
let Portifolio = require('../model/Portifolio');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteLang = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Lang,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEnterprise = async (filter) =>{
  try {
    let enterprise = await dbService.findMany(Enterprise,filter);
    if (enterprise && enterprise.length){
      enterprise = enterprise.map((obj) => obj.id);

      const departmentsFilter = { $or: [{ enterprises : { $in : enterprise } }] };
      const departmentsCnt = await dbService.deleteMany(Departments,departmentsFilter);

      let deleted  = await dbService.deleteMany(Enterprise,filter);
      let response = { departments :departmentsCnt, };
      return response; 
    } else {
      return {  enterprise : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteDepartments = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Departments,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteClient = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Client,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteContactForm = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ContactForm,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteService = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Service,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat = async (filter) =>{
  try {
    let chat = await dbService.findMany(Chat,filter);
    if (chat && chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat,filter);
      let response = { Chat_message :Chat_messageCnt, };
      return response; 
    } else {
      return {  chat : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_message,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePortifolio = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Portifolio,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const enterpriseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const enterpriseCnt = await dbService.deleteMany(Enterprise,enterpriseFilter);

      const departmentsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const departmentsCnt = await dbService.deleteMany(Departments,departmentsFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt = await dbService.deleteMany(Blog,BlogFilter);

      const ClientFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ClientCnt = await dbService.deleteMany(Client,ClientFilter);

      const ContactFormFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ContactFormCnt = await dbService.deleteMany(ContactForm,ContactFormFilter);

      const ServiceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ServiceCnt = await dbService.deleteMany(Service,ServiceFilter);

      const ChatFilter = { $or: [{ admin : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const ChatCnt = await dbService.deleteMany(Chat,ChatFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const PortifolioFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PortifolioCnt = await dbService.deleteMany(Portifolio,PortifolioFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        enterprise :enterpriseCnt,
        departments :departmentsCnt,
        Blog :BlogCnt,
        Client :ClientCnt,
        ContactForm :ContactFormCnt,
        Service :ServiceCnt,
        Chat :ChatCnt,
        Chat_message :Chat_messageCnt,
        Portifolio :PortifolioCnt,
        user :userCnt + deleted,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countLang = async (filter) =>{
  try {
    const LangCnt =  await dbService.count(Lang,filter);
    return { Lang : LangCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEnterprise = async (filter) =>{
  try {
    let enterprise = await dbService.findMany(Enterprise,filter);
    if (enterprise && enterprise.length){
      enterprise = enterprise.map((obj) => obj.id);

      const departmentsFilter = { $or: [{ enterprises : { $in : enterprise } }] };
      const departmentsCnt =  await dbService.count(Departments,departmentsFilter);

      let response = { departments : departmentsCnt, };
      return response; 
    } else {
      return {  enterprise : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countDepartments = async (filter) =>{
  try {
    const departmentsCnt =  await dbService.count(Departments,filter);
    return { departments : departmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
    const BlogCnt =  await dbService.count(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countClient = async (filter) =>{
  try {
    const ClientCnt =  await dbService.count(Client,filter);
    return { Client : ClientCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countContactForm = async (filter) =>{
  try {
    const ContactFormCnt =  await dbService.count(ContactForm,filter);
    return { ContactForm : ContactFormCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countService = async (filter) =>{
  try {
    const ServiceCnt =  await dbService.count(Service,filter);
    return { Service : ServiceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat = async (filter) =>{
  try {
    let chat = await dbService.findMany(Chat,filter);
    if (chat && chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
      return response; 
    } else {
      return {  chat : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
    const Chat_messageCnt =  await dbService.count(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPortifolio = async (filter) =>{
  try {
    const PortifolioCnt =  await dbService.count(Portifolio,filter);
    return { Portifolio : PortifolioCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const enterpriseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const enterpriseCnt =  await dbService.count(Enterprise,enterpriseFilter);

      const departmentsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const departmentsCnt =  await dbService.count(Departments,departmentsFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt =  await dbService.count(Blog,BlogFilter);

      const ClientFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ClientCnt =  await dbService.count(Client,ClientFilter);

      const ContactFormFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ContactFormCnt =  await dbService.count(ContactForm,ContactFormFilter);

      const ServiceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ServiceCnt =  await dbService.count(Service,ServiceFilter);

      const ChatFilter = { $or: [{ admin : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const ChatCnt =  await dbService.count(Chat,ChatFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const PortifolioFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const PortifolioCnt =  await dbService.count(Portifolio,PortifolioFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        enterprise : enterpriseCnt,
        departments : departmentsCnt,
        Blog : BlogCnt,
        Client : ClientCnt,
        ContactForm : ContactFormCnt,
        Service : ServiceCnt,
        Chat : ChatCnt,
        Chat_message : Chat_messageCnt,
        Portifolio : PortifolioCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteLang = async (filter,updateBody) =>{  
  try {
    const LangCnt =  await dbService.updateMany(Lang,filter);
    return { Lang : LangCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEnterprise = async (filter,updateBody) =>{  
  try {
    let enterprise = await dbService.findMany(Enterprise,filter, { id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj.id);

      const departmentsFilter = { '$or': [{ enterprises : { '$in' : enterprise } }] };
      const departmentsCnt = await dbService.updateMany(Departments,departmentsFilter,updateBody);
      let updated = await dbService.updateMany(Enterprise,filter,updateBody);

      let response = { departments :departmentsCnt, };
      return response;
    } else {
      return {  enterprise : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDepartments = async (filter,updateBody) =>{  
  try {
    const departmentsCnt =  await dbService.updateMany(Departments,filter);
    return { departments : departmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody) =>{  
  try {
    const BlogCnt =  await dbService.updateMany(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteClient = async (filter,updateBody) =>{  
  try {
    const ClientCnt =  await dbService.updateMany(Client,filter);
    return { Client : ClientCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteContactForm = async (filter,updateBody) =>{  
  try {
    const ContactFormCnt =  await dbService.updateMany(ContactForm,filter);
    return { ContactForm : ContactFormCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteService = async (filter,updateBody) =>{  
  try {
    const ServiceCnt =  await dbService.updateMany(Service,filter);
    return { Service : ServiceCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat = async (filter,updateBody) =>{  
  try {
    let chat = await dbService.findMany(Chat,filter, { id:1 });
    if (chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat,filter,updateBody);

      let response = { Chat_message :Chat_messageCnt, };
      return response;
    } else {
      return {  chat : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody) =>{  
  try {
    const Chat_messageCnt =  await dbService.updateMany(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePortifolio = async (filter,updateBody) =>{  
  try {
    const PortifolioCnt =  await dbService.updateMany(Portifolio,filter);
    return { Portifolio : PortifolioCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const enterpriseFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const enterpriseCnt = await dbService.updateMany(Enterprise,enterpriseFilter,updateBody);

      const departmentsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const departmentsCnt = await dbService.updateMany(Departments,departmentsFilter,updateBody);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const BlogCnt = await dbService.updateMany(Blog,BlogFilter,updateBody);

      const ClientFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ClientCnt = await dbService.updateMany(Client,ClientFilter,updateBody);

      const ContactFormFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ContactFormCnt = await dbService.updateMany(ContactForm,ContactFormFilter,updateBody);

      const ServiceFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ServiceCnt = await dbService.updateMany(Service,ServiceFilter,updateBody);

      const ChatFilter = { '$or': [{ admin : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const ChatCnt = await dbService.updateMany(Chat,ChatFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const PortifolioFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const PortifolioCnt = await dbService.updateMany(Portifolio,PortifolioFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        enterprise :enterpriseCnt,
        departments :departmentsCnt,
        Blog :BlogCnt,
        Client :ClientCnt,
        ContactForm :ContactFormCnt,
        Service :ServiceCnt,
        Chat :ChatCnt,
        Chat_message :Chat_messageCnt,
        Portifolio :PortifolioCnt,
        user :userCnt + updated,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteLang,
  deleteEnterprise,
  deleteDepartments,
  deleteBlog,
  deleteClient,
  deleteContactForm,
  deleteService,
  deleteChat,
  deleteChat_message,
  deletePortifolio,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countLang,
  countEnterprise,
  countDepartments,
  countBlog,
  countClient,
  countContactForm,
  countService,
  countChat,
  countChat_message,
  countPortifolio,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteLang,
  softDeleteEnterprise,
  softDeleteDepartments,
  softDeleteBlog,
  softDeleteClient,
  softDeleteContactForm,
  softDeleteService,
  softDeleteChat,
  softDeleteChat_message,
  softDeletePortifolio,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
