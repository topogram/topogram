import React from 'react'
import { connect } from 'react-redux';

import { loadUser } from '/imports/client/actions/user';
import App  from '/imports/client/ui/components/App.jsx';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
