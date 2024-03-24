import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;
const agent = chai.request.agent('http://localhost:3000/v1');

describe('Task API', () => {
  describe('GET /tasks', () => {
    it('should get all tasks', async () => {
      const res = await agent.get('/tasks'); // use agent instead of appInstance
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const task = {
        "title": "Test plants",
        "description": "Water all the plants on rooftop",
        "category": "HOME",
        "dueDate": "2024-03-28T17:11:42.561Z",
        "assignedTo": "Sid",
        "status": "PENDING",
      };
      const res = await agent.post('/task').send(task); // use agent instead of appInstance
      expect(res.status).to.oneOf([201, 200]);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('title', task.title);
    });
  });



});
