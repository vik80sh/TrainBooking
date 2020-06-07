  const   express = require('express'), 
bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const AdminRouter = express.Router();

AdminRouter.post('/adminLogin', function(req,res,next){
  if(req.body.username==="Vikash" && req.body.password==="Vikash001"){
    let token = jwt.sign({name:"Vikash" , password:"Vikash001"},'secretAdmin', {expiresIn : "60000s"});
    let data={
      name:" Vikash Gupta",
      token:token
    }
    return res.status(200).json(data);
  }else{
    return res.status(401)
  }
})

AdminRouter.get('/verify',verifyToken,function(req,res,next){
  if(decodedToken.usermane==="Vikash" && decodedToken.password==="Vikash001"){
    res.status(200);
  }
})
var decodedToken='';


function verifyToken(req,res,next){
    let token = req.query.token;
    jwt.verify(token,'secretAdmin', function(err, tokendata){
       if(err){
            return res.status(400).json({message:' Unauthorized request'});
        }
       if(tokendata){
            decodedToken = tokendata;
            next();
      }
  })
}

module.exports = AdminRouter;
