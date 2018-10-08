import React, { PropTypes } from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import ClearIcon from 'material-ui/svg-icons/content/clear'

import Markdown from 'react-remarkable'
import 'github-markdown-css'

const SelectedItem = ({
  el,
  cy,
  onUnfocusElement
}) => {

  const source= cy.filter(`node[id="${el.data.source}"]`),
    target=cy.filter(`node[id="${el.data.target}"]`)

  const title = el.group === 'nodes' ?
    el.data.name
    :
    `${source.data('name')} -> ${target.data('name')}`

  return (
    <Card
      style={{
        //bottom: 5,

        borderBottomRightRadius:"20px",
        borderTopRightRadius:"5px",
        borderBottomLeftRadius:"5px",
        boxShadow: '1px 1px 8px  #000',
        border: '1px solid #222',
        backgroundColor: el.data.color? el.data.color : 'rgb(69,90,100)',
        opacity: "0.7"

      }}
      onExpandChange={() => onUnfocusElement(el)}
      >
      <CardTitle


        style={{fontSize: "11pt", fontWeight: 'bold' }}
        showExpandableButton={true}
        title={title}
        titleStyle={{
          lineHeight :'1.2em',
          fontSize:'0.8em'
        }}
        subtitle={el.group}
        closeIcon={<ClearIcon />}
      />
    <CardText style={{fontSize: "9pt",color:"white"}}>
        {/* {
          el.group === 'nodes' ?
            <p>lat/lng : {`${lat}/${lng}`}</p>
            :
            <p>lat/lng : {`${lat}/${lng}`}</p>
        } */}
        {
          el.data.notes ?
            <Markdown source={el.data.notes} />
            :
            null
        }
      </CardText>
    </Card>
  )
}

SelectedItem.propTypes = {
  el : PropTypes.object.isRequired,
  cy : PropTypes.object.isRequired,
  onUnfocusElement : PropTypes.func.isRequired
}

export default SelectedItem
