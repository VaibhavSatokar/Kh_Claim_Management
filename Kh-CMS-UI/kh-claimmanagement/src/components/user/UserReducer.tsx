import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../service/cmsservices';

export interface IUserData {
  LoginId: string;
	UserId: string ;
	FirstName: string;
	LastName: string;
	Email: string;
	MobileNo: string;
  ProfileUrl : string
}

export interface IAppState {
  UserData: IUserData | null ;
  status: 'loading' | 'idle' | 'failed';
  error: string | null ;
}

const initialUserData: IUserData = {
  LoginId: "",
  UserId: "",
  FirstName: "",
  LastName: "",
  Email: "",
	MobileNo: "",
  ProfileUrl : ""
};

const initialState: IAppState = {
  UserData : null ,
  status: "loading",
  error: null ,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {

        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action : PayloadAction<IUserData>) => {
        state.UserData = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
