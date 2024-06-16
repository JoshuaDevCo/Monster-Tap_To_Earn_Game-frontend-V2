/* eslint-disable @typescript-eslint/no-explicit-any */
// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '../../utils/api';
import { dispatch } from '../index';

// types
import { walletStateProps } from '../../types/wallet';

// ----------------------------------------------------------------------

const initialState: walletStateProps = {
  error: null,
  user: {
      _id: '',
      username: '',
      balance: 0,
      energy: 0,
      tap: 1,
      limit: 1000,
  },
  users: []
};

const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // GET USER
    getWalletSuccess(state, action) {
      state.user = action.payload;
    },
    addWalletSuccess(state, action) {
      state.user = action.payload;
    },
    updateWalletSuccess(state, action){
      state.user = action.payload;
    }
    
  }
});

// Reducer
export default wallet.reducer;

// ----------------------------------------------------------------------

export function getWallet(username: string) {
  return async () => {
    try {
      const response = await axios.post(`/wallet/${username}`);
      dispatch(wallet.actions.getWalletSuccess(response.data));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  };
}

export function insertWallet(username: string) {
  console.log("wallet address---------->",  username);
  return async () => {
    try {
      const response = await axios.post('/wallet/add', {username: username});
      dispatch(wallet.actions.addWalletSuccess(response.data));
    } catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  };
}
export function updateWallet(username: string, balance: number, energy: number) {
  return async () => {
    try {
      const response = await axios.post(`/wallet/update/${username}`, {balance: balance, energy: energy});
      dispatch(wallet.actions.updateWalletSuccess(response.data));
    }catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  }
}
export function updateEnergy (username: string, energy: number) {
  console.log("------>", energy)
  return async () => {
    try {
      const response =  await axios.post(`/wallet/updateEnergy/${username}`, {energy: energy});
      dispatch(wallet.actions.updateWalletSuccess(response.data));
    }catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  }
}
export function updateTap (username: string, tap: number) {
  console.log("------>", tap)
  return async () => {
    try {
      const response =  await axios.post(`/wallet/updateTap/${username}`, {tap: tap});
      dispatch(wallet.actions.updateWalletSuccess(response.data));
    }catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  }
}
export function updateLimit (username: string, limit: number) {
  console.log("------>", limit)
  return async () => {
    try {
      const response =  await axios.post(`/wallet/updateLimit/${username}`, {limit: limit});
      dispatch(wallet.actions.updateWalletSuccess(response.data));
    }catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  }
}
export function updateBalance (username: string, balance: number) {
  return async () => {
    try {
      const response =  await axios.post(`/wallet/updateBalance/${username}`, {balance: balance});
      dispatch(wallet.actions.updateWalletSuccess(response.data));
    }catch (error) {
      dispatch(wallet.actions.hasError(error));
    }
  }
}
export function addFriend (username: string) {
  return async () => {
    try {
       await axios.post(`/wallet/${username}`)
       return true 
    }catch (error) {
       return false
    }
  }
}
