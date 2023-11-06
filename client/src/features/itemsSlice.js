import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('http://localhost:3001/items');
  return response.data.items;
});

export const createNewItem = createAsyncThunk('items/createNewItem', async (formData) => {
  const response = await axios.post('http://localhost:3001/items/', formData);
  return response.data.item;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (_id) => {
  await axios.delete(`http://localhost:3001/items/${_id}`);
  return _id;
});

export const updateItem = createAsyncThunk('items/updateItem', async (data) => {
  const response = await axios.put(`http://localhost:3001/items/${data._id}`, data);
  return response.data.item;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(createNewItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
        state.items[itemIndex] = action.payload;
      });
  },
});

export default itemsSlice.reducer;
