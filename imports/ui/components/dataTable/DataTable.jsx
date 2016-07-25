import React from 'react'
import ReactDOM from 'react-dom'
import { Blaze } from 'meteor/blaze'
import TabularTables from '../../../dataTables.js'

/*
  TODO : switch this component to React

  hack to run TabularTables with React
  from : https://github.com/aldeed/meteor-tabular/issues/189

  The react components are configured by HTML attributes, which must be strings.
  We are passing on this attributes when initializing the blaze templates.

  However, sometimes we need in other data types. (Numbers, booleans, arrays, or other JSON data.)
  Therefore, before passing on the data to the blaze templates, we need to convert them to the
  correct data types. This files defines functions to do that.
 */

let _parseBlazeArg = function (value) {
    try {
        /*
          Here, we try to interpret the string as JSON.
          (Besides actual JSON data, this also works for array, booleans and numbers.)

          Before the attempt to interpret the string as JSON, as preparation, we:
           - Replace single quotes with double qoutes.
           - Try to quote unquoted JSON. (ie. key: "value" ==> "key": "value"
         */
        return JSON.parse(value.replace(/'/g, "\"").replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '));
    } catch (err) {
        return value;
    }
};

let _parseBlazeArgs = function (args) {
    var result = {}
    for (let key of Object.keys(args)) {
        result[key] = _parseBlazeArg(args[key]);
    }
    return result;
};

const DataTable = React.createClass({
    componentDidMount() {
        let data = _parseBlazeArgs(this.props);
        data.table = TabularTables[this.props.table];
        this.view = Blaze.renderWithData(Template.tabular, data,
            ReactDOM.findDOMNode(this.refs.container));
    },
    componentWillUnmount() {
        Blaze.remove(this.view);
    },
    render() {
        return <span ref="container"/>;
    }
});

export default DataTable
