Template.share.events({
    "change #shared-public": function (event) {
        if (event.target.checked) Meteor.call("makePublic", this.topogramId);
        else Meteor.call("makePrivate", this.topogramId);
    }
})
