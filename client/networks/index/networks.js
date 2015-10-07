Template.addNetwork.events({
    'submit form': function(event){
      event.preventDefault();
      var networkName = $('[name=networkName]').val();
      Meteor.call("createNetwork",networkName);
      $('[name=networkName]').val('');
    }
});

Template.networks.events({
    'click .delete' : function(e) {
      e.preventDefault();
      Meteor.call("deleteNetwork", this._id);
    }
});

Template.networks.helpers({
    networks : function(e) {
      return Networks.find().fetch().map(function(d, i){
         d.index = i+1;
         d.privacy = d.sharedPublic ? "Public" : "Private";
         d.date = moment(d.createdAr).format("MMMM Do YYYY, h:mm:ss a");
         return d;
        });
      }
});

