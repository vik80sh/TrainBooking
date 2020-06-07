const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartBook = new Schema({
  id:               {type: String },
  email:            {type:String , require:true},
  title:            {type: String } ,
  description:      {type: String },
  author :          {type: String },
  image :           {type: String },
});


module.exports = mongoose.model('cartBook', cartBook);