import { configureStore, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: null, 
  isAuthenticated: false,
  dashboardUrl: null,
  userId: null,
  sellerId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.dashboardUrl = action.payload.dashboardUrl;
      state.sellerId = action.payload.sellerId;
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
      state.userId = action.payload.userId;
      state.sellerId = action.payload.sellerId;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.dashboardUrl = null;
      state.userId = null;
      state.sellerId = null;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.sellerProductId === action.payload.sellerProductId
      );

      if (existingItem) {
        toast.warning("Item already in cart!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        state.push(action.payload);
        toast.success(action.payload.product.productName + " added to cart!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    },

    clearCart: () => {
      toast.info("Cart has been cleared", {
        position: "top-right",
        autoClose: 2000,
      });
      return []; // Returns an empty array to clear the cart
    },
  },
});



export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

export const { login, logout, addUser } = userSlice.actions;
export const { addToCart, clearCart } = cartSlice.actions;

const persistedState = loadState();
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    cart: store.getState().cart,
  });
});

export default store;
