import './commentForm.html'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'

Template.commentForm.events = {
    'click #submit': function(e){
        e.preventDefault()

        let body = $('#body').val()
        let type = Session.get('currentType') || "nodes"
        let elementId = Session.get('currentId') || "node-000"
        let topogramId = FlowRouter.getParam('topogramId')


        if(body !="")  {
            Meteor.call("addComment", topogramId, type, elementId, body, Meteor.userId())
            $('#body').val('')   // reset textarea display
        }
    }

}
