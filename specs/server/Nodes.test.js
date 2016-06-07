import { chai } from 'meteor/practicalmeteor:chai';
chai.should();

describe('Nodes', function() {

  describe('makeNode', function(){
    var node;

    it("should be create a new node", function(){
      before(function(){
        node = {}; // makeNode();
        // console.log(node);
      })

      node.should.equal(1);
      node.should.be.a("string")

    })

  });

  describe('addNode', function() {

    it('should call Mongo insert method', function() {

      //Setup a spy to watch for calls to Nodes.insert
      // spyOn(Nodes,"insert");

      //Call workoutInsert Meteor Method
      // Meteor.call('addNode');

      //Verify if Nodes.insert was called
      // expect(Nodes.insert).toHaveBeenCalled();
      var a = 1;
      a.should.be(1);
    })

  });

  describe("starNode", function(){
    it("should store the appropriate starred value", function(){

      Meteor.user = function() { return {} }; // mock user

      var node;
      var starred;
      before(function(){
        node = "ex";//Nodes.findOne();
        // starred = node.data.starred;
        // console.log(node);
        // console.log(starred);
      });

      // Meteor.call("starNode", node);
      //
      // var  = Nodes.findOne({"_id" : node._id })
      // console.log(node_after.data.star == starred)
      node.should.be(1);


    })
  })
});
