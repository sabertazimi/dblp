import React, { Component } from 'react';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  render() {
    const { selected } = this.state;

    return (
      <div>
        {
          selected.map(venue => (
            <span key={venue}>
              {venue}
            </span>
          ))
        }
      </div>
    );
  }
}
