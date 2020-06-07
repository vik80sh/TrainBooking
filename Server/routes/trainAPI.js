const express = require('express'),
  bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const TrainRouter = express.Router();

const Train = require('../schema/TrainSchema');

TrainRouter.get('/trainList', function (req, res) {
  let from = req.query.source.toLowerCase();
  let to = req.query.destination.toLowerCase();
  if (from === "all")
    Train.find({},function (err, post) {
      if (err)
        return res.status(400).json(err)
      else
        return res.status(200).json(post);
    });
    else
      Train.find({from:from,to:to},function (err, post) {
        if (err)
          return res.status(400).json(err)
        else
          return res.status(200).json(post);
      });
});

TrainRouter.post('/addTrain', verifyToken, function (req, res, next) {
  let train = new Train({
    id: new Date(),
    trainName: req.body.trainName.toLowerCase(),
    trainNumber: req.body.trainNumber.toLowerCase(),
    price: req.body.price,
    to: req.body.to.toLowerCase(),
    from: req.body.from.toLowerCase()
  })


  let promise = Train.findOne({
    trainName: req.body.trainName, to: req.body.to,
    from: req.body.from
  }).exec();

  promise.then(function (result) {
    if (result) {
      return res.status(201).json({ message: "Already Present In Database" });
    }
    else {
      let promise = train.save();
      promise.then(function (doc) {
        return res.status(200).json(doc);
      })
      promise.catch(function (err) {
        return res.status(501).json({ message: 'Error ' })
      })
    }
  });
})


TrainRouter.post('/delete', verifyToken, function (req, res, next) {
  Train.remove({ id: req.body.id }, function (err, obj) {
    if (err) return res.status(401);
    return res.status(200).json(obj);
  })
})


function verifyToken(req, res, next) {
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

function verifyTokenT(req, res, next) {
  let token = req.body.token;
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
module.exports = TrainRouter;