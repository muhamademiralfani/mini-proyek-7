import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/products';
const initialState = {
  products: [],
  product: {},
  loading: false,
  isEdit: false,
  error: null,
  isSuccess: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
  },
);

export const updateStockProduct = createAsyncThunk(
  'products/updateStockProduct',
  async (product) => {
    const response = await axios.patch(`${API_URL}/${product.id}`, product);
    return response.data;
  },
);

export const currentProducts = (product) => {
  return {
    type: 'products/currentProduct',
    payload: product,
  };
};

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    currentProduct: (state, action) => {
      state.product = action.payload;
      state.isEdit = true;
    },
    clearProduct: (state) => {
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    // fetching products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.isEdit = false;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.isEdit = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.isEdit = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // get product by id
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.isEdit = false;
      state.error = null;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.isEdit = false;
      state.product = action.payload;
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.isEdit = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // add product
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
      state.isEdit = false;
      state.isSuccess = false;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // update product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // update stock product
    builder.addCase(updateStockProduct.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
    });
    builder.addCase(updateStockProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateStockProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.isEdit = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isEdit = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.isEdit = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // strock in
  },
});

export default productsSlice.reducer;
