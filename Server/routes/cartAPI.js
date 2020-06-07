const   express = require('express'), 
bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CartRouter = express.Router();

const Cart = require('../schema/cartSchema');

var decodedToken='';
CartRouter.post('/addtocart', verifyToken, function(req,res,next){
  const email= decodedToken.email;
      let cart = new Cart({
        id:req.body.book.id,
        email:email,
        title : req.body.book.title,
        description:req.body.book.description,
        image:req.body.book.image,
        author:req.body.book.author,
      })
      let promise = cart.save();
    
      promise.then(function(doc){
        return res.status(200).json(doc);
      })
    
      promise.catch(function(err){
        return res.status(501).json({message: 'Error registering user.'})
      })
    }
  );  

  
  CartRouter.post('/inCart', verifyToken, function(req,res,next){
        const email= decodedToken.email;
       
        let promise = Cart.find({email:email , id:req.body.id}).exec();
  
        promise.then(function(doc){
       
          return res.status(200).json(doc);
        })
    
        promise.catch(function(err){
          return res.status(400).json(err);
        })
    
  })
  
CartRouter.get('/cartItem', verifyToken, function(req,res,next){

    const email= decodedToken.email;
    let promise = Cart.find({email:email}).exec();

    promise.then(function(doc){
      return res.status(200).json(doc);
    })

    promise.catch(function(err){
      return res.status(200).json(err);
    })

})


CartRouter.post('/return', verifyToken, function(req,res,next){
  
      const email= decodedToken.email;
    
      let promise = Cart.remove({email:email , id:req.body.id}).exec();

      promise.then(function(doc){
        return res.status(200).json(doc);
      })
  
      promise.catch(function(err){
        return res.status(200).json(err);
      })
  
})

function verifyToken(req,res,next){
  
    let token = req.body.token;

    if(token==undefined)
      token=req.query.token

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
CartRouter.get('/cart', verifyTokenAdmin, function(req,res,next){
  
      
      let promise = Cart.find().exec();
  
      promise.then(function(doc){
       
        return res.status(200).json(doc);
      })
  
      promise.catch(function(err){
        return res.status(200).json(err);
      })
  
  })
function verifyTokenAdmin(req,res,next){
  
    let token = req.body.token;

    if(token==undefined)
      token=req.query.token

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
module.exports = CartRouter;