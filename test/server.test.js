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
      .end(done);
    });

    it('should check id is valid or not',(done)=>{
    request(app)
    .get(`/todo/123`)
    .expect(404)
    .end(done);
    });

});
////////////////////////////////////////////////////////////////////////////
describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos1[1]._id.toHexString();

    request(app)
      .delete(`/todo/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        ToDo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todo/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todo/123abc')
      .expect(404)
      .end(done);
  });
});

describe('patch(update) /todo/:id',()=>{

  it('should check for update',(done)=>{
    var text="Ashish";
    var hexId=todos1[0]._id.toHexString();
    request(app)
    .patch(`/todo/${hexId}`)
    .send({text,
    completed:true})
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo1.text).toBe("Ashish");
      expect(res.body.todo1.completed).toBe(true);
      expect(res.body.todo1.completedAt).toBeA("number");

    })
    .end(done);
  });


});
