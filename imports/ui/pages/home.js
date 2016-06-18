import './home.html'
import { Template } from 'meteor/templating'
import { Topograms } from '../../api/collections.js'
// import { publicTopograms } from '../../api/topograms/topogramsMethods.js'

// components in the template
import './topograms/topograms-index.js'
import './topograms/topograms-add.js'

Template.home.helpers( {
    hasPublicTopograms: function() {
        return Topograms.find( { "sharedPublic": 1 }, { 'sort': {  'createdAt': 1 } } ).fetch().length > 0
    },
    publicTopograms: function() {
        return Topograms.find( { "sharedPublic": 1 }, { 'sort': {  'createdAt': 1 } } )
    }
} ) 
