const express = require('express'),
  bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const BookingRouter = express.Router();

const UserBooking = require('../schema/UserBookinSchema');

var decodedToken = '';
BookingRouter.post('/booking', verifyToken, function (req, res, next) {
  const username = decodedToken.username;
  let Booking = new UserBooking({
    id: req.body.id,
    username: username,
    bookingDetail: req.body.userDetails,
    trainName: req.body.trainName,
    trainNumber: req.body.trainNumber,
    price: req.body.price,
    to: req.body.to,
    from: req.body.from,
    date: req.body.date,
  })
  let promise = Booking.save();
  promise.then(function (doc) {
    return res.status(200).json(doc);
  })
  promise.catch(function (err) {
    return res.status(501).json({ message: 'Error registering user.' })
  })
}
);


BookingRouter.get('/allbookedticket', verifyToken, function (req, res, next) {
  const username = decodedToken.username;
  let promise = UserBooking.find({ username: username }).exec();

  promise.then(function (doc) {
    return res.status(200).json(doc);
  })
  promise.catch(function (err) {
    return res.status(200).json(err);
  })

})


BookingRouter.post('/cancel', verifyToken, function (req, res, next) {
  const username = decodedToken.username;
  let promise = UserBooking.remove({ username: username, _id: req.body.id }).exec();
  promise.then(function (doc) {
    return res.status(200).json(doc);
  })
  promise.catch(function (err) {
    return res.status(200).json(err);
  })

})

function verifyToken(req, res, next) {
  let token = req.body.token;
  if (token == undefined)
    token = req.query.token
  jwt.verify(token, 'secret', function (err, tokendata) {
    if (err) {
      return res.status(400).json({ message: ' Unauthorized request' });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}
BookingRouter.get('/adminbooking', verifyTokenAdmin, function (req, res, next) {
  let promise = Booking.find().exec();
  promise.then(function (doc) {
    return res.status(200).json(doc);
  })
  promise.catch(function (err) {
    return res.status(200).json(err);
  })

})
function verifyTokenAdmin(req, res, next) {
  let token = req.body.token;
  if (token == undefined)
    token = req.query.token
  jwt.verify(token, 'secretAdmin', function (err, tokendata) {
    if (err) {
      return res.status(400).json({ message: ' Unauthorized request' });
    }
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}
module.exports = BookingRouter;