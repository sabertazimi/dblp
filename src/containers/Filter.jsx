import React from 'react';
import { connect } from 'react-redux';

import * as Actions from '../actions';
// import { VENUES_LIST, getVenueTitle } from '../api';
import { Filter } from '../components';

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indeterminate: true,
      checkAll: false,
    };
  }

  render() {
    return (
      <Filter {...this.props} {...this.state} />
    );
  }
}

const mapStateToProps = state => ({
  ...state.filter,
});

const mapDispatchToProps = dispatch => ({
  filterVenue: venues => (dispatch(Actions.filterVenue(venues))),
  filterYear: year => (dispatch(Actions.filterYear(year))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterContainer);
