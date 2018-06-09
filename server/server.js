require('../config/config');
const _ = require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('../db/mongoose.js');
var {ToDo}=require('../model/ToDo');
var {User}=require('../model/User');
const port=process.env.PORT;
const app=express();
app.use(bodyParser.json());
///////////////////////////////////////////////////////////////////////////////
app.post("/todos",(req,res)=>{

  var todo=new ToDo({
      text:req.body.text
  });
  todo.save().then((doc)=>{
      res.status(200).send(doc);
    },(e)=>{
      res.status(400).send(e);
    });
});
///////////////////////////////////////////////////////////////////////////////
app.get('/todos',(req,res)=>{
  ToDo.find().then((todos)=>{
      res.send({todos})
  },(e)=>{
    res.status(400).send(e);
  });
});
///////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////
app.delete('/todo/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  ToDo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
///////////////////////////////////////////////////////////////////////////////
app.patch('/todo/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('id not valid');
    }
    var body=_.pick(req.body,['text','completed']);
    console.log(body);
    if(_.isBoolean(body.completed)&&body.completed){
        body.completedAt=new Date().getTime();
    }
    else{
      body.completed=false;
      body.completedAt=null;
    }
    ToDo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo1)=>{
      if(!todo1){
        return res.status(404).send('not found')
      }
        res.send({todo1});
    }).catch((e)=>{
        res.status(404).send('not found');
    })
});
///////////////////////////////////////////////////////////////////////////////
app.listen(port,()=>{
  console.log('running on port ',port);
});
///////////////////////////////////////////////////////////////////////////////
module.exports={app};
