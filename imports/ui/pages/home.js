import './home.html'
import { Template } from 'meteor/templating'
import { Topograms } from '../../api/collections.js'
import { publicTopograms } from '../../api/topograms/topogramsMethods.js'

import '../../ui/components/topograms/topograms-index.js'
import '../../ui/components/topograms/topograms-add.js'

Template.home.helpers( {
    hasPublicTopograms: function() {
        return publicTopograms.fetch().length > 0;
    },
    publicTopograms: function() {
        return publicTopograms.fetch();
    }
} );
