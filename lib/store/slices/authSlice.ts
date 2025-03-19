// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { mockAuth, AuthError } from "@/lib/mockData/mockAuth";

// interface User {
//   id: string;
//   email: string;
//   name: string;
// }

// interface AuthState {
//   user: User | null;
//   isLoading: boolean;
//   error: string | null;
// }

// interface LoginCredentials {
//   email: string;
//   password: string;
// }

// const initialState: AuthState = {
//   user: mockAuth.getCurrentUser(),
//   isLoading: false,
//   error: null,
// };

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials: LoginCredentials, { rejectWithValue }) => {
//     try {
//       const user = await mockAuth.login(credentials);
//       return user;
//     } catch (error) {
//       if (error instanceof AuthError) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("An unexpected error occurred");
//     }
//   }
// );

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await mockAuth.logout();
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       })
//       // Logout
//       .addCase(logout.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.error = null;
//       });
//   },
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;

