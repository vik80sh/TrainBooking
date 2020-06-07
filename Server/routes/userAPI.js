const   express = require('express'), 
        bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const UsersRouter = express.Router();

const User = require('../schema/UserSchema');


UsersRouter.post('/register',  function(req,res,next){
    let promise = User.findOne({email:req.body.username}).exec();
    promise.then(function(result){
      if(result) {
          return res.status(201).json({message:'Sorry !! The user-id is already present in database'})
        } else {
          let user = new User({
            name : req.body.name,
            username: req.body.username,
            password: User.hashPassword(req.body.password),
            creation_dt: Date.now()
          });
         let promise1 = user.save();
          promise1.then(function(doc){
            return res.status(201).json({message:'Registation Succusful !!'});
          })
          promise1.catch(function(err){
            return res.status(401).json( 'Error registering user')
          })
        }
      });
     promise.catch(function(err){
       return res.status(500).json('Some internal error');
     })
  })

  UsersRouter.post('/login', function(req,res,next){
    let promise = User.findOne({username:req.body.username}).exec();
    promise.then(function(result){
     if(result) {
       if(result.isValid(req.body.password)){
           console.log(" = == = ",result)
           let token = jwt.sign({name:result.name , username:result.username},'secret', {expiresIn : "3600s"});
           let data={
             name:result.name,
             token:token
           }
           return res.status(200).json(data);
       } else {
         return res.status(401).json('Invalid Credentials');
       }
     }
     else {
       return res.status(401).json('Username is not registered.')
     }
    });
    promise.catch(function(err){
      return res.status(500).json('Some internal error');
    })
 })
 
var decodedToken='';
UsersRouter.get('/username', verifyToken, function(req,res,next){
    let promise = User.findOne({email:decodedToken.email}).exec();
    promise.then(function(result){
        return res.status(200).json(result);
    })
    promise.catch(function(err){
        return res.status(500).json({message:'Some internal error'});
    })
}) 

function verifyToken(req,res,next){
  let token = req.query.token;
  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}

 module.exports = UsersRouter;
