//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');//object de strcture  as a above

MongoClient.connect("mongodb://localhost:27017/ToDoAPps",(error,db)=>{
  if(error){
  return console.log("error");
  }

    console.log("Connected");
    // db.collection("Todos").insertOne({
    //   text:"Something",
    //   completed:false
    // },(err,result)=>{
    //   if(err){
    //     return console.log("error "+err);
    //   }
    //   console.log(JSON.stringify(result.ops,undefined,2));
    //
    // });
    db.collection("users").insertOne({
      name:"Ashish Sanap",
      age:24,
      location:"Pune"
    },(err,result)=>{
      if(err){
        return console.log("errr ",+err)
      }
    //  console.log(JSON.stringify(result.ops,undefined,2));
    console.log(result.ops[0]._id.getTimestamp());

    });
    db.close();

});
