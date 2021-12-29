import { Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";

const CustomRoute = (props) => {
  const routerList = props.routerList;
  const routerListRecursion = (routerList) => {
    return Object.assign(routerList).map(
      ({ display, path, exact, routes, component: LazyComponent }, key) => {
        let newItem = { path, exact, routes };
        if (display && routes && routes.length) {
          return routerListRecursion(routes);
        } else {
          if (display) {
            return (
              <Route
                key={key}
                {...newItem}
                render={(props) => <LazyComponent {...props} />}
              ></Route>
            );
          } else {
            return null;
          }
        }
      }
    );
  };
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Switch>{routerListRecursion(routerList)}</Switch>
    </Suspense>
  );
};

export default CustomRoute;
