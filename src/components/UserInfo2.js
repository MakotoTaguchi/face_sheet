import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Test1 from "./childComponents/Test1";
import Test2 from "./childComponents/Test2";
import SignOut from "./SignOut";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Test1</div>,
    main: () => <Test1 />,
  },
  {
    path: "/Test2",
    sidebar: () => <div>Test2</div>,
    main: () => <Test2 />,
  },
];

function UserInfo2() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
            background: "#f0f0f0",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Test1</Link>
            </li>
            <li>
              <Link to="/Test2">Test2</Link>
            </li>
          </ul>

          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.sidebar />}
              />
            ))}
          </Routes>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Routes>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.main />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default UserInfo2;
