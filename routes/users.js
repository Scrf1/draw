var express = require('express');
var router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var models = require('../models')

router.use(cors());

process.env.SECRET_KEY = 'secret';
/* GET users listing. */


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res) {
  var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY);

  models.User.findOne({
    where: {id: decoded.id}
  }).then(function(userFound){
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({'error':'User does not exist'});
    }
  }).catch(function(err){
    res.status(404).json({'error':'other error'});
  })
});

router.post('/login',(req, res) => {
  email = req.body.email;
  password = req.body.password;

  models.User.findOne({
      where: {email: email}
  }).then(function(userFound){
    
      if(userFound){
            bcrypt.compare(password,userFound.password, function(errBycrypt,resBycrypt){
                if(resBycrypt){
                    let token = jwt.sign(userFound.dataValues, process.env.SECRET_KEY,{
                      expiresIn: '1h'
                    })
                    res.status(201).json({token: token});
                } else {
                    res.status(403).json({'error': 'invalid password'})
                }
            })
        }else{
            return res.status(404).json({'error':'user not exist in DB'})
        }
      
  }).catch(function(err) {
    res.status(409).json({'error': 'other error'})
  })
 
});

router.post('/register',(req,res) => {
  first_name = req.body.first_name;
  last_name = req.body.last_name;
  email = req.body.email;
  password = req.body.password;

   models.User.findOne({
        attributes: ['email'],
        where: {email: email}
    }).then(function(userFound){
        if(!userFound){
            const hash = bcrypt.hashSync(password, 10);
            var newUser = models.User.create({
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: hash
            }).then(function(newUser){
                let token = jwt.sign(newUser.dataValues, process.env.SECRET_KEY,{
                  expiresIn: '1h'
                })
                return res.status(201).json({token: token});
            }).catch(function(err){
                return res.status(500).json({'error':'cannot add user'})
            })
          
        }else{
            return res.status(409).json({'error':'user already exist'});
        }
    }).catch(function(err){
      return res.status(409).json({'error':'autre erreur'});
    })
});

module.exports = router;
