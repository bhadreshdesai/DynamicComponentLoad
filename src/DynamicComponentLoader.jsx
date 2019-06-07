import React, { lazy, Suspense } from "react";

class DynamicComponentLoader extends React.Component {
  render() {
    let { pathname } = this.props.location;
    pathname = pathname.replace("/component/", "");
    const DynamicComponent = lazy(() => import("./components/" + pathname));
    console.log(pathname);
    //return <div>This is default component</div>;
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent />
      </Suspense>
    );
  }
}

export default DynamicComponentLoader;
