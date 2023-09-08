import React, {useEffect} from 'react';
import {useSetState} from 'react-use';
import {fetchLogin, fetchLogout, fetchRegister} from "../api/auth";

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: undefined,
  isLoginPending: false,
  loginError: null,
  isRegistered: false,
  isRegisterPending: false,
  registerError: null,
  isLogoutPending: false,
  isLogoutSuccess: false,
  isLogoutError: null
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});


  const setRegisterPending = (isRegisterPending) => setState({isRegisterPending});
  const setRegisterSuccess = (isRegistered) => setState({isRegistered});
  const setRegisterError = (registerError) => setState({registerError});


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false);
    }

  }, [])

  const login = async ({email, password}) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    const rs = await fetchLogin({email, password})
    setLoginPending(false);
    debugger
    if (rs.ok) {
      const {token} = await rs.json()
      localStorage.setItem('token', token);
      setLoginSuccess(true);
    } else {
      setLoginSuccess(false)
      setLoginError(rs.statusText);
    }
  }
  const register = async (data) => {
    setRegisterPending(true);
    setRegisterSuccess(false);
    setRegisterError(null);
    setLoginSuccess(false);
    setLoginError(null);

    const rs = await fetchRegister(data)
    setRegisterPending(false);
    if (rs.ok) {
      setRegisterSuccess(true);
    } else {
      setRegisterSuccess(false)
      setRegisterError('error');
    }
  }


  const logout = async () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);

    const rs = await fetchLogout()
    if (rs.ok) {
      localStorage.removeItem('token');
      window.location.reload()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
