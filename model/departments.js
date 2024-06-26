/**
 * departments.js
 * @description :: model of a database collection departments
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    name:{
      type:String,
      required:true,
      unique:true,
      uniqueCaseInsensitive:true
    },

    code:{
      type:String,
      unique:true,
      required:true,
      uniqueCaseInsensitive:true
    },

    enterprises:{
      ref:'enterprise',
      type:Schema.Types.ObjectId
    },

    email:{
      type:String,
      required:false,
      unique:true,
      uniqueCaseInsensitive:true
    },

    phone:{
      type:String,
      required:false,
      unique:false,
      uniqueCaseInsensitive:true
    },

    website:{ type:String },

    address:{
      type:String,
      required:true,
      unique:false,
      uniqueCaseInsensitive:true
    },

    isActive:{
      type:Boolean,
      default:true
    },

    isDelete:{
      type:Boolean,
      default:false
    },

    createdAt:{ type:Date },

    updatedAt:{ type:Date },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user'
    },

    isDeleted:{ type:Boolean },

    img:{ type:String }
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
schema.plugin(uniqueValidator,{ message: 'Error, expected {VALUE} to be unique.' });
const departments = mongoose.model('departments',schema);
module.exports = departments;