if (Meteor.isClient) {
    // Accounts.ui.config({
    //   passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
    // });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
