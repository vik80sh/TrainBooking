const express = require('express')
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/DB');

const app = express();
const UserSchema = require('./routes/userAPI');
const TrainSchema = require('./routes/trainAPI');
const UserBookingSchema = require('./routes/userBookinAPI');
const AdminSchema = require('./routes/adminAPI');

mongoose.Promise = global.Promise;
mongoose.connect(config.DBconfig.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
  );

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
const Port = process.env.PORT || 4000;

app.use('/users', UserSchema);
app.use('/train', TrainSchema);
app.use('/userbooking', UserBookingSchema);
app.use('/admin', AdminSchema)
const server = app.listen(Port, function () {
  console.log('Listening on port ' + Port);
});

module.exports = server