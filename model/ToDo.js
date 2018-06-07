const mongoose=require('mongoose');


var ToDo=mongoose.model('ToDo',{
  text:{
    required:true,
    type:String,
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
module.exports={ToDo};
