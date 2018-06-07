const {MongoClient,ObjectID}=require("mongodb");
//
MongoClient.connect("mongodb://localhost:27017/ToDoAPps",(err,db)=>{
if(err){
  return console.log("error to connect",err);
}
// deleteMany
// db.collection("Todos").deleteMany({text:"Ashish is confuse"}).then((res)=>{
//   console.log(res);
// });
//deleteOne

// db.collection("Todos").deleteOne({completed:true}).then((res)=>{
//    console.log(res);
// });

//findOneAndDelete
db.collection("Todos").findOneAndDelete({completed:true}).then((res)=>{
   console.log(res);
});

});
