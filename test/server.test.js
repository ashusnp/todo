const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');
var {app}=require('../server/server');
var {ToDo}=require('../model/ToDo');
const todos1=[{
  _id:new ObjectID(),
  text:'First text'
},{
  _id:new ObjectID(),
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
describe('find by id',()=>{
  var id='5b1b8904d4a88e1ff8ee0a79';
it("should find by id",(done)=>{
request(app)
.get(`/todo/${todos1[0]._id.toHexString()}`)
.expect(200)
.expect((res)=>{
  expect(res.body.todo.text).toBe(todos1[0].text);
})
.end(done);
});

it('should return 404 if todo not found',(done)=>{
  request(app)
  .get(`/todo/${new ObjectID().toHexString()}`)
  .expect(404)
  // .expect((res)=>{
  //   console.log(res.body);
  //   expect(res.body).toBe('not found');
  // })
  .end(done);
});

it('should check id is valid or not',(done)=>{
request(app)
.get(`/todo/123`)
.expect(404)
.end(done);
});

});
