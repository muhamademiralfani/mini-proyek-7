import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/async/productsSlice';
import { fetchLogs } from '../redux/async/logSlice';
import './styles/mainDashboard.css';
import Loading from '../components/Loading';

const MainDashboard = () => {
  const dispatch = useDispatch();

  // Fetching products and logs from the Redux store
  const {
    products,
    loading: loadingProducts,
    error: errorProducts,
  } = useSelector((state) => state.products);
  const {
    logs,
    loading: loadingLogs,
    error: errorLogs,
  } = useSelector((state) => state.logs);
  
  const language = useSelector((state) => state.language.language); // Get language from Redux state

  // Calculate totals
  const totalProducts = products.length; // Total number of products
  const totalStockIn = logs.filter((log) => log.type === 'stock_in').length; // Count of stock in logs
  const totalStockOut = logs.filter((log) => log.type === 'stock_out').length; // Count of stock out logs

  // Calculate total stock across all products
  const totalStock = products.reduce(
    (acc, product) => acc + Number(product.stock),
    0,
  ); // Total stock from all products

  // Calculate stock out occurrences for each product
  const stockOutCounts = {};
  logs.forEach((log) => {
    if (log.type === 'stock_out') {
      if (stockOutCounts[log.productId]) {
        stockOutCounts[log.productId]++;
      } else {
        stockOutCounts[log.productId] = 1;
      }
    }
  });

  // Create an array of products with their stock out counts
  const productsWithStockOutCounts = products.map((product) => ({
    name: product.name,
    stockOutCount: stockOutCounts[product.id] || 0, // Default to 0 if no stock out
  }));

  // Sort products by stock out count and get the top 5
  const top5StockOutProducts = productsWithStockOutCounts
    .sort((a, b) => b.stockOutCount - a.stockOutCount)
    .slice(0, 5);

  // Handle loading and error states
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchLogs());
  }, [dispatch]);

  if (loadingProducts || loadingLogs) {
    return <Loading />
  }

  if (errorProducts) {
    return <div>Error fetching products: {errorProducts}</div>;
  }

  if (errorLogs) {
    return <div>Error fetching logs: {errorLogs}</div>;
  }

  return (
    <div className="main-container">
      <div className="main-title">
        <h2>{language === 'en' ? 'DASHBOARD' : 'DASHBOARD'}</h2>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>{language === 'en' ? 'PRODUCTS' : 'PRODUK'}</h3>
            <span className="material-icons-outlined">inventory_2</span>
          </div>
          <h1>{totalProducts}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>{language === 'en' ? 'STOCK IN' : 'STOK MASUK'}</h3>
            <span className="material-icons-outlined">arrow_circle_down</span>
          </div>
          <h1>{totalStockIn}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>{language === 'en' ? 'STOCK OUT' : 'STOK KELUAR'}</h3>
            <span className="material-icons-outlined">arrow_circle_up</span>
          </div>
          <h1>{totalStockOut}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>{language === 'en' ? 'TOTAL STOCK' : 'TOTAL STOK'}</h3>
            <span className="material-icons-outlined">inventory_2</span>
          </div>
          <h1>{totalStock}</h1>
        </div>
      </div>

      <div className="charts">
        <div className="charts-card">
          <h2 className="chart-title">
            {language === 'en' ? 'Top 5 Products with Stock Out' : '5 Produk Teratas dengan Stok Keluar'}
          </h2>
          <table className="top-products-table">
            <thead>
              <tr>
                <th>{language === 'en' ? 'Product Name' : 'Nama Produk'}</th>
              </tr>
            </thead>
            <tbody>
              {top5StockOutProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
