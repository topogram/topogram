Template.slider.helpers({
  topograms : function() {
    return Topograms.find().fetch()
  }
})

Template.header.rendered = function() {
  // sidebar
  $('.collapsing').sideNav({
    closeOnClick: true,
    menuWidth: 300, // Default is 240
    edge: 'left' // Choose the horizontal origin
  });
}
