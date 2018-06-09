const expect=require('expect');
const request=require('supertest');

var {app}=require('../server/server');
var {ToDo}=require('../model/ToDo');
const todos1=[{
  text:'First text'
},{
  text:'Second Text'
}];
beforeEach((done)=>{
    ToDo.remove({}).then(()=>{
      return ToDo.insertMany(todos1);
    }).then(()=>{
      done();
    });
});      // for clearing db each time
describe('Post ToDOs',()=>{
  var text="First test";
it('should be post',(done)=>{
  request(app)
  .post('/todos')
  .send({text})
  .expect(200)
  .expect((res)=>{
    expect(res.body.text).toBe(text);
  })
  .end((err,res)=>{
    if(err){
      return done(err);
    }
    ToDo.find({text}).then((todos)=>{ // to check data in mongodb
      expect(todos.length).toBe(1);
      expect(todos[0].text).toBe(text);
      done();

    }).catch((err)=>done(err));
  });
});

//*******************************************************************************//
it("should not send invalid body",(done)=>{
  request(app)
  .post('/todos')
  .send({})
  .expect(400)
  .end((err,res)=>{
    if(err){
      return done(err);
    }
    ToDo.find().then((todos)=>{
      expect(todos.length).toBe(2);
      done();
    }).catch(()=>done());
  })
});

//************************************************************************//
it('should get todo',(done)=>{
  request(app)
  .get('/todos')
  .expect(200)
  .end((err,res)=>{
    if(err){
      return done(err);
    }
    ToDo.find().then((todos)=>{
      expect(todos.length).toBe(2);
      done();
    }).catch(()=>done());
  })
})

});
