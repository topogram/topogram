Template.header.helpers({
  isLoggedIn : function() {
    console.log(Meteor.userId());
    console.log("ha");
    return Meteor.userId() ? true : false;
  }
})

Template.header.events = {
  "click #logout": function() {
      Meteor.logout(function(err) {
        // callback
        console.log("logged out");
    });
  }
}
