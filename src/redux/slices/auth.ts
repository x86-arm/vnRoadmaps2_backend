import authServices from "services/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  // Tên action
  "auth/login",

  async (data: any, { rejectWithValue }) => {
    const response = await authServices.login(data);

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response.statusText || "err");
    }

    return response.data;
  }
);
export const getUserData = createAsyncThunk(
  // Tên action
  "auth/me",

  async (data: any, { rejectWithValue }) => {
    const response = await authServices.me();

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response.statusText || "err");
    }

    // localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
    // localStorage.setItem("accessToken", response.data.tokens.accessToken);

    return response.data;
  }
);

interface InitialState {
  currentUser: boolean;
  authenticated: boolean;
  session: {
    _id: string;
    email: string;
    fullname: string;
    username: string;
    password: string;
    phone: number;
    role: string;
    updateAt: Date;
    createAt: Date;
    __v?: number;
  } | null;
  loading: boolean;
  errorMessage: string | null | undefined;
  pageLoading: boolean;
}

const initialState = {
  currentUser: false,
  authenticated: false,
  session: null,
  loading: false,
  errorMessage: null,
  pageLoading: true,
} as InitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateSession: (state, action: PayloadAction<string>) => {
      state.authenticated = true;
      // state.session = action.payload;
    },
    // logout: (state?) => {
    //   localStorage.clear();
    //   state.authenticated = false;
    //   state.session = {};
    // },
  },
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(login.pending, (state) => {
      // Bật trạng thái loading
      state.pageLoading = false;
      state.loading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(login.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.currentUser = true;
      state.authenticated = true;
      state.loading = false;
      state.session = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(login.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.loading = false;
      state.authenticated = false;
      state.errorMessage = action.error.message;
    });

    builder.addCase(getUserData.pending, (state) => {
      // Bật trạng thái loading
      state.pageLoading = true;
      state.loading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getUserData.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.pageLoading = true;
      state.authenticated = true;
      state.loading = false;
      state.session = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getUserData.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.pageLoading = false;
      state.currentUser = false;
      state.loading = false;
      state.authenticated = false;
      state.errorMessage = action.error.message;
    });
  },
});
export const { updateSession } = authSlice.actions;

export default authSlice.reducer;
