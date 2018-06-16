const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _ = require('lodash');
const bcrypt=require('bcryptjs');
var UserSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:`is not valid email`
    }
  },
    password:{
      type:String,
      required:true,
      minlength:3
    },
    tokens:[{
      access:{
        type:String,
        required:true
      },
      token:{
        type:String,
        required:true
      }
    }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;
  try{
      decoded=jwt.verify(token,'abc123');
  }catch(e){

    // return  new Promise((resolve,reject)=>{
    //     reject();
    // });
    return Promise.reject();
  }
  return User.findOne({
    '_id':decoded._id,
    'tokens.access':'auth',
    'tokens.token':token
  });

}

UserSchema.pre('save',function(next){
  var user=this;

  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hashPasswordValue)=>{
        if(err){

        }
        user.password=hashPasswordValue;
        next();
      });
    });
  }
  else{
    next();
  }
});
UserSchema.methods.generateAuthToken=function() {
  console.log('here');
  var user=this;
  var access='auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  //user.tokens.push({access,token});
  user.tokens=user.tokens.concat([{access,token}]);
  console.log(user.tokens);
  return  user.save().then(()=>{
    return token;
  }).catch((e)=>{
    console.log(e);
  });
};
var User=mongoose.model('User',UserSchema);
module.exports={User};
