import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUser } from "../../api/authApi"


const initialState = {
    isLoading: false,
    user: null,
    loginError: null,
    token: null
}

export const fetchUser = createAsyncThunk("user/fetchUser", async (credential) => {
    return await getUser(credential)
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers:{
/*         setUser: (state, action) => {
            state.user = action.payload
        },
        getToken: (state, action) => {
            state.token = action.payload
        }, */
        logOut: (state) => {
            state.user = null;
            state.token = null;
        }
    },
    extraReducers:{
        [fetchUser.pending]: (state) => {
            state.isLoading = true
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.userData;
            state.token = action.payload.token;
        },
        [fetchUser.rejected]: (state, action) => {
            state.isLoading = true;
            state.loginError = action.error.message;
        },
    }
})
export const { setUser, getToken, logOut } = loginSlice.actions
export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectLoginError = (state) => state.user.loginError;
export const selectToken = (state) => state.login.token;

export default loginSlice.reducer;