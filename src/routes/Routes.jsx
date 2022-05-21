import React from 'react';
import { Routes as ReactRoutes } from "react-router-dom";
import { Route } from "react-router-dom";

import routeList from "./routeList";

const Routes = () => {
  return (
    <ReactRoutes>
      {routeList.map(({ path, Element }) => (
      <Route key={path} path={path} element={<Element />} />
      ))}
    </ReactRoutes>
  )
}

export default Routes;