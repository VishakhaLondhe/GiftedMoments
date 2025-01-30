// import { createSlice } from "@reduxjs/toolkit";


// const loggedSlice=createSlice({

//     name:'logged',
//     initialState:{
//         loggedIn:false
//     },
//     reducers:{
//         login:(state)=>{console.log("in login action");return {loggedIn:true}},

//         logout:(state)=>{
//             console.log("in logout action");
//             return{loggedIn:false}
//         }
//     }
// })

// export const{login,logout}=loggedSlice.actions
// export default loggedSlice.reducer;

// Action to handle login



// slice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("In login action");
      state.user = action.payload; // Store the User object
      state.isAuthenticated = true; // Set authentication status to true
    },
    logout: (state) => {
      console.log("In logout action");
      state.user = null; // Clear the User object
      state.isAuthenticated = false; // Set authentication status to false
    },
  },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
