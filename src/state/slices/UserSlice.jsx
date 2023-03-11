import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    token: "",
    loggedIn: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProfile: (state, data) => {
            state.profile = data.payload
        },
        setToken: (state, data) => {
            state.token = data.payload
        },
        setLoggedin: (state) => {
            state.loggedIn = true
        },
        logout: (state) => {
            state.profile = {}
            state.token = ""
            state.loggedIn = false
        }
    }
})

export const { setProfile, logout, setToken, setLoggedin } = userSlice.actions;
export default userSlice.reducer;