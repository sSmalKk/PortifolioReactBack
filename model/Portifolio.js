/**
 * Portifolio.js
 * @description :: model of a database collection Portifolio
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
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

    Link:{
      type:String,
      required:false,
      unique:false,
      lowercase:false,
      trim:false,
      uniqueCaseInsensitive:true
    },

    Titulo:{
      type:String,
      required:true,
      unique:false,
      lowercase:false,
      trim:false,
      uniqueCaseInsensitive:true
    },

    Company:{
      type:String,
      required:true,
      unique:false,
      lowercase:false,
      trim:false,
      uniqueCaseInsensitive:true
    },

    Content:{
      type:String,
      required:true,
      unique:false,
      lowercase:false,
      trim:false,
      uniqueCaseInsensitive:true
    },

    isDeleted:{ type:Boolean },

    isActive:{
      type:Boolean,
      required:true
    },

    createdAt:{
      type:Date,
      required:true
    },

    updatedAt:{
      type:Date,
      required:true,
      unique:false
    },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user',
      required:true
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user',
      required:true
    },

    initialDate:{ type:Date },

    finalDate:{ type:Date },

    progress:{
      type:Number,
      required:true
    },

    image:{
      lowercase:false,
      trim:false,
      unique:false,
      type:String,
      required:true,
      uniqueCaseInsensitive:true
    }
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
const Portifolio = mongoose.model('Portifolio',schema);
module.exports = Portifolio;