// Default routing settings
Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: '404'
});


Router.route('/', {
    name: 'root',
    waitOn: function () {
        return Meteor.subscribe('publicNetworks');
    },
    action: function () {
        if (!this.ready())  this.render("loading");
        else this.render('home');
    }
});

