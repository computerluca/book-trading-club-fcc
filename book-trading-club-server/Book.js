var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title:  {type:String},
  image: String,
  id_user:String,
  approved:{type:Boolean,default:false},
  requested_by:{type:String,default:null}
  
});
module.exports = mongoose.model('Book', BookSchema);