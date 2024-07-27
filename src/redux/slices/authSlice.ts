import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BASE_URL} from '../../../constant';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: false,
};

export const loginUserAction = createAsyncThunk(
  'loginUser',
  async (_, {rejectWithValue}) => {
    try {
      await GoogleSignin.hasPlayServices();
      const Data = await GoogleSignin.signIn();
      console.log({Data});

      const res = await fetch(`${BASE_URL}/auth/google-signin`, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: Data.idToken}),
      });
      const RESPONSE = await res.json();
      console.log({RESPONSE});

      return RESPONSE;
    } catch (error) {
      console.log('loginUserAction_err', error);
      return rejectWithValue(error?.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      GoogleSignin.signOut();
      state.user = null;
    },
  },
  extraReducers(builder) {
    // get user by id
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {signOut} = authSlice.actions;

export default authSlice.reducer;
