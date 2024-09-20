import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderItems: [],
};
export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    addOrderService: (state, action) => {
      const { orderItem } = action.payload;
      const alreadyItem = state?.orderItems?.find(
        (item) => item?.service === orderItem.service
      );
      if (alreadyItem) {
        alreadyItem.amount += orderItem.amount;
      } else {
        state?.orderItems?.push(orderItem);
      }
    },
    increaseAmount: (state, action) => {
      const { idService } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.service === idService
      );
      itemOrder.amount++;
    },
    decreaseAmount: (state, action) => {
      const { idService } = action.payload;

      const itemOrder = state?.orderItems?.find(
        (item) => item?.service === idService
      );
      if (itemOrder.amount > 1) {
        itemOrder.amount--;
      }
    },
    removeOrderService: (state, action) => {
      const { idService } = action.payload;
      const itemOrder = state?.orderItems?.filter(
        (item) => item?.service !== idService
      );
      state.orderItems = itemOrder;
    },
  },
});

export const {
  addOrderService,
  increaseAmount,
  decreaseAmount,
  removeOrderService,
} = OrderSlice.actions;

export default OrderSlice.reducer;
