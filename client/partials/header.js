Template.menu.helpers({
  topograms : function() {
    return Topograms.find().fetch()
  }
})

Template.header.rendered = function() {
  // sidebar
  $('#menu-trigger').sideNav({
    closeOnClick: true,
    menuWidth: 300, // Default is 240
    edge: 'left' // Choose the horizontal origin
  });
}
