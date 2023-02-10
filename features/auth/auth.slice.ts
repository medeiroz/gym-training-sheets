import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../contracts/auth/IUser';

export interface AuthState {
  auth: boolean,
  token: string|null,
  user: IUser|null,
}



const initialState: AuthState = {
  auth: false,
  token: null,
  user: null,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser|null>) {
      state.auth = true;
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string|null>) {
      state.auth = true;
      state.token = action.payload
    },
    restart() {
      return initialState
    }
  },
})

export const { setUser, setToken, restart } = authSlice.actions
export const authReducer = authSlice.reducer