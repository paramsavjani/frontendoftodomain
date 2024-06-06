import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: "", isLoggedin: false },
    reducers: {
        login: (state) => {
            state.isLoggedin = true;
        },
        logout: (state) => {
            state.isLoggedin = false;
        },
    },
});

export const authActions = authSlice.actions;


export const store = configureStore({
    reducer: authSlice.reducer,
});