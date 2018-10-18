import React, { Component } from 'react';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withOnLoad = (WrappedComponent, onLoad) => {
  class WithOnLoad extends Component {
    componentDidMount() {
      onLoad(this.props);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithOnLoad.displayName = `WithOnLoad(${getDisplayName(WrappedComponent)})`;
  return WithOnLoad;
}

export default withOnLoad;
