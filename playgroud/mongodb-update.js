const {MongoClient,ObjectID}=require("mongodb");
//
MongoClient.connect("mongodb://localhost:27017/ToDoAPps",(err,db)=>{
if(err){
  return console.log("error to connect",err);
}
//findOneAndUpdate
db.collection('users').findOneAndUpdate({
  _id:new ObjectID("5b136764d73a9320d48c19a8")
},{
  $set:{
    name:"Dhanshree"
  }
},{
  returnOriginal:false
}).then((res)=>{
  console.log(res);
});

});
