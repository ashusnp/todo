const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password="abc123!";
var hv='$2a$10$Sl.EU6B7G0VRXYmC5wQ0ROfFZr2/RLJOwzCjZlO3oitKYb8VPK2cG';
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hashValue)=>{
    console.log("hashValue ",hashValue);
    //hv=hashValue;
  })
});
bcrypt.compare(password,hv,(err,result)=>{
  console.log('result ',result);
})
////////////////////////////////////
var msg="I love Dhanshree";
var hash=SHA256(msg).toString();
console.log(msg);
console.log(hash);

var data={
  id:10
};
var token=jwt.sign(data,'123abc');
console.log(token);

var decoded=jwt.verify(token,'123abc');
console.log(decoded);
