import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, isLoggedIn: false };

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action){
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout(state, action){
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;