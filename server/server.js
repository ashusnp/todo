const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('../db/mongoose.js');
var {ToDo}=require('../model/ToDo');
var {User}=require('../model/User');

const app=express();
app.use(bodyParser.json());
app.post("/todos",(req,res)=>{
//console.log(req.body);
  var todo=new ToDo({
      text:req.body.text
  });
  todo.save().then((doc)=>{
      res.status(200).send(doc);
    },(e)=>{
      res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
  ToDo.find().then((todos)=>{
      res.send({todos})
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todo/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send("not valid");
  }

  ToDo.findById(id).then((todo)=>{
      if(!todo)
      return  res.status(404).send("not found");
      res.send({todo});
    },(e)=>{
      res.status(400).send("error");
    });



});

app.listen(3000,()=>{
  console.log('running on port ',3000);
});
module.exports={app};
