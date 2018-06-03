const {MongoClient,ObjectID}=require("mongodb");

MongoClient.connect("mongodb://localhost:27017/ToDoAPps",(err,db)=>{
if(err){
  return console.log("error to connect",err);
}
db.collection("Todos").find({
  _id:new ObjectID('5b1373bfdd4d42b6a782de4b')
}).toArray().then((docs)=>{
console.log("ToDOs");
console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  if(err){
    return console.log("unable to find ",err);
  }

});


db.collection('users').find({name:"Ashish Sanap"}).forEach((docs)=>{
console.log("Users ");
console.log(docs);
},(err)=>{
  if(err){
    return console.log("error to read user")
  }
})

});
