const mongoose=require('./db/mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApp');

var ToDo=mongoose.model('ToDo',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  }
});

var newToDo=new ToDo({
  text:"Validators"
});
newToDo.save().then((doc)=>{
  console.log("Save ToDo ",doc);
},(e)=>{
  console.log("Error ",e);
});

var user=mongoose.model('user',{
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  }
});
var newUser=new user({
email:' ashusnp@gmail.com     '
});
newUser.save().then((doc)=>{
console.log("Save user ",JSON.stringify(doc,undefined,2))
},(e)=>{
  console.log("eror ",e)
});
