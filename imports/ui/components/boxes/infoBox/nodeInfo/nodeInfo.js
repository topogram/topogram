import './nodeInfo.html'
import { Template } from 'meteor/templating'

import { $ } from 'meteor/jquery'

Template.nodeInfo.rendered= function(){
  $(".collapsible").collapsible()
}
