import React from 'react'

const styles = {
  div:{
    padding: 14,
    margin: 'auto'
  }
}

class CardBody extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.div}>
        {this.props.children}
      </div>
    )
  }
}

CardBody.muiName = 'CardText'

CardBody.propTypes = {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: React.PropTypes.bool,
  /**
   * Can be used to render elements inside the Card Text.
   */
  children: React.PropTypes.node,
  /**
   * Override the CardText color.
   */
  color: React.PropTypes.string,
  /**
   * If true, this card component is expandable.
   */
  expandable: React.PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: React.PropTypes.object,
}

CardBody.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default CardBody
