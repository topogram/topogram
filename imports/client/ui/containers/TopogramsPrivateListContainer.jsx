import { connect } from 'react-redux';
import { stopSubscription } from 'meteor-redux-middlewares';

import { TOPOGRAMS_PRIVATE_SUB, loadPrivateTopograms } from '/imports/client/actions/topograms';

import TopogramsPrivateList from '/imports/client/ui/pages/TopogramsPrivateList';

const mapStateToProps = state => ({
    ready: state.topogramsPrivate.ready,
    topograms: state.topogramsPrivate.topograms
  })

const mapDispatchToProps = dispatch => ({
  loadPrivateTopograms: () => dispatch(loadPrivateTopograms()),
  stopTopogramsSubscription: () => dispatch(stopSubscription(TOPOGRAMS_PRIVATE_SUB)),
});


export const TopogramsPrivateListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopogramsPrivateList);
