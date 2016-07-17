import './edgeInfo.html'
import { Template } from 'meteor/templating'

Template.edgeInfo.rendered= function(){
  $(".collapsible").collapsible()
}
