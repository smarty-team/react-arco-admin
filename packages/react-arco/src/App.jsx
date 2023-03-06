import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import React, { useMemo } from "react";
import { getFlattenRoutes, routes } from "./routes";

function App() {
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to={'/dashboard'}>dashboard</Link>
          <Link to={'/example'}>example</Link>
        </nav>
        <Routes>
          {flattenRoutes.map((route) => {
            return (
              <Route
                key={route.key}
                path={`/${route.key}`}
                element={route.component}
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
