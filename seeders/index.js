/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'QpPCXqEiR8eGjOj',
      'isDeleted':false,
      'username':'Caleb.Erdman69',
      'email':'Euna_Yundt@gmail.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Caleb.Erdman69' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'H97DmukSybXgJTz',
      'isDeleted':false,
      'username':'Virgil.Jacobi19',
      'email':'Desiree_Strosin@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Virgil.Jacobi19' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'dnp0LQmyFkM57qw',
      'isDeleted':false,
      'username':'Andres_Hand',
      'email':'Malvina_Conn@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Client
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let client = await dbService.updateOne(User, { 'username':'Andres_Hand' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Client', 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/chat/create',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/addbulk',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/list',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/admin/chat/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/chat/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/chat/count',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/chat/update/:id',
        role: 'Client',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'Client',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/softdelete/:id',
        role: 'Client',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/softdeletemany',
        role: 'Client',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat/delete/:id',
        role: 'Client',
        method: 'DELETE' 
      },
      {
        route: '/admin/chat/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/chat/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat/deletemany',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/count',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/client/create',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/client/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/client/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/client/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/client/addbulk',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/client/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/client/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/client/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/client/update/:id',
        role: 'Client',
        method: 'PUT' 
      },
      {
        route: '/admin/client/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/client/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/client/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/client/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/admin/client/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/client/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/client/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/client/updatebulk',
        role: 'Client',
        method: 'PUT' 
      },
      {
        route: '/admin/client/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/client/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/client/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/client/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/client/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/client/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/client/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/client/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/client/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/client/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/client/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/client/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/client/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/client/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/client/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/client/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/client/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/contactform/create',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/contactform/addbulk',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/contactform/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/contactform/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/contactform/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/contactform/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/contactform/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/contactform/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/contactform/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/contactform/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/contactform/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/contactform/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/contactform/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/content/list',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/content/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/content/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/content/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/content/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/admin/content/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/content/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/content/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/content/count',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/content/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/content/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/content/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/content/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/content/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/content/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/content/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/content/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/content/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/content/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/content/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/content/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/content/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/content/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/content/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/content/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/content/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/content/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/content/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/content/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/content/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portifolio/list',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portifolio/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/admin/portifolio/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/portifolio/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/portifolio/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/portifolio/count',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portifolio/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portifolio/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/portifolio/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/portifolio/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/portifolio/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/portifolio/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/portifolio/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/portifolio/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/portifolio/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/portifolio/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/service/list',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/service/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/service/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/service/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/service/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/admin/service/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/service/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/service/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/service/count',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/admin/service/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/service/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/service/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/service/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/service/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/service/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/service/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/service/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/service/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/service/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/service/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/service/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/service/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/service/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/service/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/service/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/service/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/service/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/service/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/service/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/service/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/enterprise/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/enterprise/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/blog/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/create',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/list',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat/count',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/chat/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/client/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/client/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/client/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/client/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/client/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/client/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/client/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/client/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/client/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/contactform/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/contactform/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/contactform/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/contactform/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/contactform/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/contactform/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/contactform/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/content/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/content/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/content/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/content/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/content/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/content/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/content/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/content/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/content/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/content/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/content/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/device/api/v1/portifolio/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/portifolio/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/portifolio/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/portifolio/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/portifolio/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/portifolio/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/portifolio/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/portifolio/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/service/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/service/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/service/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/service/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/service/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/service/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/service/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/service/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/service/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/service/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/service/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/enterprise/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/enterprise/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/enterprise/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/enterprise/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'Client',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/chat/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Client',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/client/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/partial-update/:id',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/updatebulk',
        role: 'Client',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/client/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/client/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/client/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/client/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/client/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/client/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/client/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/client/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/create',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/addbulk',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/:id',
        role: 'User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/contactform/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/contactform/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/contactform/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/contactform/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/contactform/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/contactform/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/contactform/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/content/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/content/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/content/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/content/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/content/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/content/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/content/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/content/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/content/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/content/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/content/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/list',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/:id',
        role: 'Client',
        method: 'GET'
      },
      {
        route: '/client/api/v1/portifolio/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/portifolio/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/portifolio/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/portifolio/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/count',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/portifolio/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/portifolio/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/portifolio/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/portifolio/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/list',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/service/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/service/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/:id',
        role: 'Client',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/service/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/service/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/service/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/service/count',
        role: 'Client',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/service/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/service/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/service/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/service/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/service/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/enterprise/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/enterprise/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/enterprise/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/enterprise/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Client', 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Caleb.Erdman69',
      'password':'QpPCXqEiR8eGjOj'
    },{
      'username':'Virgil.Jacobi19',
      'password':'H97DmukSybXgJTz'
    },{
      'username':'Andres_Hand',
      'password':'dnp0LQmyFkM57qw'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;