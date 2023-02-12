import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '../store'

export interface UserInfo {
  name: string,
  avatar: string
}

export interface AuthState {
  isLogin: boolean,
  userInfo: UserInfo | null
}

const initialState: AuthState = {
  isLogin: false,
  userInfo: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    },
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      console.log(action.payload);
      if (action.payload) {
        state.isLogin = true
      } else {
        state.isLogin = false
        localStorage.clear()
      }
      
      state.userInfo = action.payload
    },
  }
})

export const selectIsLogin = (state: AppState) => state.auth.isLogin
export const selectUserInfo = (state: AppState) => state.auth.userInfo
export const { setLoginState, setUserInfo } = authSlice.actions
export default authSlice.reducer
