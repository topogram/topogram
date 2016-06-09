import './home.html'
import { Template } from 'meteor/templating'
import { Topograms } from '../../api/collections.js'
// import { publicTopograms } from '../../api/topograms/topogramsMethods.js'

// components in the template
import '../../ui/components/topograms/topograms-index.js'
import '../../ui/components/topograms/topograms-add.js'

Template.home.onCreated(function () {
  this.autorun(() => {
    this.subscribe('topograms.public', Meteor.userId());
  });
  // this.subscribe('topograms.private');
})

Template.home.helpers( {
    hasPublicTopograms: function() {
        return Topograms.find( { "sharedPublic": 1 }, { 'sort': {  'createdAt': 1 } } ).fetch().length > 0
    },
    publicTopograms: function() {
        return Topograms.find( { "sharedPublic": 1 }, { 'sort': {  'createdAt': 1 } } )
    }
} );
