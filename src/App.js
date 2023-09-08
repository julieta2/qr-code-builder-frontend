import React, {useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import {AuthContext} from "./context/AuthContext";
import PrivateRoute from "./components/routes/PrivateRoute";
import QRCode from "./components/QRCode";
import PublicRoute from "./components/routes/PublicRoutes";
import {QRCodeProvider} from "./context/QRCodeContext";
import QRCodeList from "./components/QRCodeList";
import QRCodeDetail from "./components/QRCodeDetail";

function App() {
  const {state: {isLoggedIn}} = useContext(AuthContext);

  if (isLoggedIn === undefined) {
    return <div>Loading...</div>
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={<PublicRoute element={<Login/>} isAuthenticated={isLoggedIn}/>}
          />
          <Route
            path="/register"
            element={
              <PublicRoute element={<Register/>} isAuthenticated={isLoggedIn}/>
            }
          />
          <Route
            path="/create"
            element={<QRCodeProvider><PrivateRoute element={<QRCode/>} isAuthenticated={isLoggedIn}/></QRCodeProvider>}
          />
          <Route
            path="/list"
            element={<QRCodeProvider><PrivateRoute element={<QRCodeList/>}
                                                   isAuthenticated={isLoggedIn}/></QRCodeProvider>}
          />
          <Route
            path="/detail/:id"
            element={<QRCodeProvider><PrivateRoute element={<QRCodeDetail/>}
                                                   isAuthenticated={isLoggedIn}/></QRCodeProvider>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
