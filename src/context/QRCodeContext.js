import React, {createContext, useContext, useReducer} from 'react';
import {createQRCode} from "../api/QRCode";
import {useSetState} from "react-use";

const initialState = {
  codes: [],
  error: '',
  creatingQrCodePending: false,
  creatingQrCodeSuccess: false,
};

const QRCodeContext = createContext(null);

export const QRCodeProvider = ({children}) => {
  const [state, setState] = useSetState(initialState);

  const setCreatingQRPending = (pending) => setState({creatingQrCodePending: pending});
  const setCreatingQRSuccess = (success) => setState({creatingQrCodeSuccess: success});
  const setCreatingQRError = (error) => setState({error});
  const create = async (values) => {
    setCreatingQRPending(true);
    setCreatingQRSuccess(false);
    setCreatingQRError(null);

    const rs = await createQRCode(values)
    setCreatingQRPending(false);
    setCreatingQRSuccess(true);
    if (rs.ok) {
      const {qr_code} = await rs.json()
      const stateCopy = {...state}
      setState({...stateCopy, codes: qr_code});
    } else {
      setCreatingQRError('error');
    }
  }
  return (
    <QRCodeContext.Provider value={{state, createQRCode: create}}>
      {children}
    </QRCodeContext.Provider>
  );
};

export const useQRCodeContext = () => {
  return useContext(QRCodeContext);
};
