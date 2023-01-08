import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUser } from "../../api/authApi";
import { toast } from "react-hot-toast";




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
            localStorage.setItem('Token', action.payload.token);
            toast.success("User LoggedIn Successfully");

        },
        [fetchUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.loginError = action.error.message;
        },
    }
})
export const { setUser, getToken, logOut } = loginSlice.actions
export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.isLoading;
export const selectLoginError = (state) => state.user.loginError;
export const selectToken = (state) => state.login.token;

export default loginSlice.reducer;