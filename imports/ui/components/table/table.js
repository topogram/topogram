import './table.html'
import './table.css'
import '../boxes/nodeMerge/nodeMerge.js'

// import './tableRow.js'

import { Session } from 'meteor/session'
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'

import {EditableText} from 'meteor/babrahams:editable-text'
import { Nodes } from '../../../api/collections.js'
import { ReactiveVar } from 'meteor/reactive-var'

Template.table.created = function() {
  console.log("table")
  let template = Template.instance();

  template.searchQuery = new ReactiveVar()
  template.searching   = new ReactiveVar( false )
  template.limit   = new ReactiveVar( 0 )
  template.offset   = new ReactiveVar( 0 )
  template.sorting   = new ReactiveVar()
  template.selected   = new ReactiveVar([])

  Session.set("mergeSource", null)
  Session.set("mergeTargets", null )
}

Template.table.events({
  'keyup [name="search"]' ( event, instance ) {
    let value = event.target.value.trim();
    if ( value !== '' ) { instance.searchQuery.set( value ); }
  },
  'click .searchClose': function( event, instance ) {
      event.preventDefault();
      instance.searchQuery.set('');
  },
  'click .delete': function( event, instance ) {
      event.preventDefault();
      let id = event.currentTarget.dataset.id
  },
  'click .merger': function( event, instance ) {
    event.preventDefault();
    let selected = instance.selected.get()
    console.log(selected);
    Session.set("mergeSource", Nodes.findOne(selected[0]))
    Session.set("mergeTargets", Nodes.find({ "_id" :{ '$in' : selected.shift() }}) )
    $('#modal-merge').openModal()
  },
  'click .sortable': function( event, instance ) {
      event.preventDefault();
      let field = event.currentTarget.dataset.field
      let sort = {}
      let prevSort = instance.sorting.get()

      // sort
      sort[field] = prevSort && prevSort[field] == 1 ? -1 : 1
      instance.sorting.set(sort);

      // display sorting indicator
      let sortClass = sort[field] == 1 ? "arrow-up" : "arrow-down"

      // remove from all sortable columns
      document.getElementsByClassName("sortable").className = "sortable"
      event.currentTarget.className = "sortable "+sortClass;
  },
  'change [type="checkbox"]' : function(event, instance) {

    let selected = instance.selected.get(),
      id = event.currentTarget.dataset.id,
      i = selected.indexOf(id)

    if (event.currentTarget.checked && i == -1 )
      selected.push(id)
    else if (event.currentTarget.checked && i >= 0 )
      selected.splice(i, 1)

    instance.selected.set(selected)
  }
})

Template.table.helpers( {

    'count': function() {
      return Nodes.find().count()
    },
    'rows': function() {
      // console.log(Nodes.findOne());
      let q = {},
        projection = {
          limit : Template.instance().limit.get(),
          offset : Template.instance().offset.get(),
          sort: Template.instance().sorting.get()
        };

      let search = Template.instance().searchQuery.get();

      if ( search ) {
         let regex = new RegExp( search, 'i' );
         q = { "data.name" : regex }
       }
      return Nodes.find(q, projection).fetch()
    },
    'searching' : function() {
      console.log(this);
      return Template.instance().searching.get();
    },
    query : function() {
      return Template.instance().searchQuery.get();
    },
    hasSelection : function() {
      return Template.instance().selected.get().length > 1 ? true : false
    }
})
