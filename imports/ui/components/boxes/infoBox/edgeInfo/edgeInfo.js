import './edgeInfo.html'
import { Template } from 'meteor/templating'

import { $ } from 'meteor/jquery'

Template.edgeInfo.rendered= function(){
  $(".collapsible").collapsible()
}
