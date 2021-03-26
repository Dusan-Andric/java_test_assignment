import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Main application error boundary.
 *
 * This is meant to wrap the entire application to render a whole page error
 * message when an exception is thrown.
 */
class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error !== null) {
      return (
        <div>
          <h1>Oops! An error occurred</h1>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
