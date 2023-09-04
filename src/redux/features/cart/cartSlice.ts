import { IProduct } from '@/types/globalTypes';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type ICart = {
  products: IProduct[];
  total: number;
};

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const checkProduct = state.products.find(
        (v) => v._id === action.payload._id
      );
      if (checkProduct) {
        checkProduct.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const checkProduct = state.products.find(
        (v) => v._id === action.payload._id
      );
      if (checkProduct && checkProduct.quantity! > 1) {
        checkProduct.quantity! -= 1;
      } else {
        state.products = state.products.filter(
          (p) => p._id !== action.payload._id
        );
      }
      state.total -= action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

export default cartSlice.reducer;
