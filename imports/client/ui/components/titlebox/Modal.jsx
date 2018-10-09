import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      fontSize:'8pt'
    };

    return (
      <div className="backdrop" style={{backdropStyle}}>
        <div className="modal" style={{modalStyle}}>
          {this.props.children}

          <div className="footer">

            <IconButton
              onClick={this.props.onClose}
              style={{ float:'right', zIndex : 20000 }}
              >
                <ClearIcon color='#F2EFE9' />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
