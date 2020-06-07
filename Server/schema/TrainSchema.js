
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var train = new Schema({
  id:               {type: String },
  trainName:        {type: String },
  trainNumber:      {type: String },
  price:            {type: Number },
  to:               {type: String },
  from:             {type: String },
});


module.exports = mongoose.model('train', train);