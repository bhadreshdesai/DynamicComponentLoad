import React, { lazy, Suspense } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    error["shouldIgnore"] = true;
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
class DynamicComponentLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorBoundaryKey: 0 };
  }

  clearErrorBoundary = () =>
    this.setState(prevState => ({
      errorBoundaryKey: prevState.errorBoundaryKey + 1
    }));

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.errorBoundaryKey === nextState.errorBoundaryKey;
  }

  componentDidUpdate() {
    this.clearErrorBoundary();
  }
  render() {
    const { errorBoundaryKey } = this.state;
    let { pathname } = this.props.location;
    pathname = pathname.replace("/component/", "");
    const DynamicComponent = lazy(() => import("./components/" + pathname));
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary key={errorBoundaryKey}>
          <DynamicComponent />
        </ErrorBoundary>
      </Suspense>
    );
  }
}

export default DynamicComponentLoader;
