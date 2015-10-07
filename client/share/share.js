Template.share.events({
    "change #shared-public": function (event) {
        if (event.target.checked) Meteor.call("makePublic", this.networkId);
        else Meteor.call("makePrivate", this.networkId);
    }
})
