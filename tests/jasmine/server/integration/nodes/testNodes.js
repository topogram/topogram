describe('Nodes', function() {

  describe('makeNode', function(){
    var node;

    it("should be create a new node", function(){
      beforeEach(function(){
        node = makeNode();
        console.log(node);
      })

      expect(1).toBeUndefined();

    })

  });

  describe('addNode', function() {

    it('should call Mongo insert method', function() {

      //Setup a spy to watch for calls to Nodes.insert
      spyOn(Nodes,"insert");

      //Call workoutInsert Meteor Method
      Meteor.call('addNode');

      //Verify if Nodes.insert was called
      expect(Nodes.insert).toHaveBeenCalled();
    })

  });

  describe("starNode", function(){
    it("should store the appropriate starred value", function(){

      Meteor.user = function() { return {} }; // mock user

      var node;
      var starred;
      beforeEach(function(){
        node = Nodes.findOne();
        // starred = node.data.starred;
        // console.log(node);
        // console.log(starred);
      });

      // Meteor.call("starNode", node);
      //
      // var  = Nodes.findOne({"_id" : node._id })
      // console.log(node_after.data.star == starred)
      expect(1).toBeUndefined();


    })
  })
});
