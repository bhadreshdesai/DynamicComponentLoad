import React from "react";

class DynamicComponentLoader extends React.Component {
  render() {
    const { pathname } = this.props.location;
    console.log(pathname);
    return <div>This is default component</div>;
  }
}

export default DynamicComponentLoader;
